from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Activity
from amt.models import Team
from amt.models import Template
from amt.models import Class
from amt.serializers import ActivitySerializer
from amt.serializers import TemplateSerializer


class ActivityController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create', 'create_from_template', 'destroy', 'get_activities_by_class', 'get_submitted_activities_by_class',
                           ]:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
        
    
    #@action(detail=False, methods=['POST'])
    #CREATE ACTIVITY
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Save the activity without committing to the database
            activity = serializer.save(activity_team=None)
            
            # Get the team_id from the request data (you may want to validate this)
            team_id = request.data.get('team_id', None)
            
            if team_id:
                try:
                    team = Team.objects.get(pk=team_id)
                    activity.activity_team = team
                    activity.save()  # Commit the activity to the database with the assigned team
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Team.DoesNotExist:
                    return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Team ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #CREATE ACTIVITY FROM TEMPLATE
    @action(detail=False, methods=['POST'])
    def create_from_template(self, request):
        template_id = request.data.get('template_id', None)
        team_id = request.data.get('team_id', None)

        if template_id is not None:
            try:
                template = Template.objects.get(pk=template_id)

                # Create a new activity based on the template
                new_activity = Activity.create_activity_from_template(template)

                # Update additional fields, such as the team and any other desired fields
                if team_id:
                    try:
                        team = Team.objects.get(pk=team_id)
                        new_activity.activity_team = team
                    except Team.DoesNotExist:
                        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

                # Save the updated activity
                new_activity.save()

                # Serialize the template and activity
                template_serializer = TemplateSerializer(template)
                activity_serializer = ActivitySerializer(new_activity)

                return Response(
                    {
                        "success": "Activity created from template",
                        "activity": activity_serializer.data,
                        "template": template_serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            except Template.DoesNotExist:
                return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Template ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
    #GET ACTIVITY FROM TEAM ID
    def list(self, request, *args, **kwargs):
        team_id = request.query_params.get('team_id')

        if team_id is None:
            return Response(
                {"error": "The 'team_id' query parameter is required."},
                status=status.HTTP_BAD_REQUEST
            )

        try:
            activities = Activity.objects.filter(activity_team=team_id)
            serializer = ActivitySerializer(activities, many=True)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response(
                {"error": f"Team with ID {team_id} not found."},
                status=status.HTTP_NOT_FOUND
            )
        
    # @action(detail=False, methods=['GET'])
    # def get_all_activities_by_team(self, request):
    #     team_id = request.query_params.get('team_id')

    #     if team_id is None:
    #         return Response(
    #             {"error": "The 'team_id' query parameter is required."},
    #             status=status.HTTP_BAD_REQUEST
    #         )

    #     try:
    #         # Fetch the team based on the provided 'team_id'
    #         team_instance = Team.objects.get(pk=team_id)

    #         # Get all activities in the team
    #         activities = Activity.objects.filter(activity_team=team_instance)

    #         serializer = ActivitySerializer(activities, many=True)

    #         return Response(serializer.data)
    #     except Team.DoesNotExist:
    #         return Response(
    #             {"error": f"Team with ID {team_id} not found."},
    #             status=status.HTTP_NOT_FOUND
    #         )
        
    @action(detail=False, methods=['GET'])
    def get_submitted_activities_by_team(self, request):
        team_id = request.query_params.get('team_id')

        if team_id is None:
            return Response(
                {"error": "The 'team_id' query parameter is required."},
                status=status.HTTP_BAD_REQUEST
            )

        try:
            # Fetch the team based on the provided 'team_id'
            team_instance = Team.objects.get(pk=team_id)

            # Get all submitted activities in the team
            submitted_activities = Activity.objects.filter(
                activity_team=team_instance, submission_status=True
            )

            serializer = ActivitySerializer(submitted_activities, many=True)

            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response(
                {"error": f"Team with ID {team_id} not found."},
                status=status.HTTP_NOT_FOUND
            )
        
    @action(detail=False, methods=['GET'])
    def get_activities_by_class(self, request):
        class_id = request.query_params.get('class_id')

        if class_id is None:
            return Response(
                {"error": "The 'class_id' query parameter is required."},
                status=status.HTTP_BAD_REQUEST
            )

        try:
            # Fetch the class based on the provided 'class_id'
            class_instance = Class.objects.get(pk=class_id)
            
            # Get all teams that belong to the specified class
            teams_in_class = Team.objects.filter(team_class=class_instance)

            # Get all activities in teams of the specified class
            activities = Activity.objects.filter(activity_team__in=teams_in_class)
            
            serializer = ActivitySerializer(activities, many=True)
            
            return Response(serializer.data)
        except Class.DoesNotExist:
            return Response(
                {"error": f"Class with ID {class_id} not found."},
                status=status.HTTP_NOT_FOUND
            )
        
    #Toggle Status to true or false
    @action(detail=True, methods=['POST'])
    def submit(self, request, pk=None):
        try:
            activity = Activity.objects.get(pk=pk)
        except Activity.DoesNotExist:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)

        # Toggle the submission_status field
        activity.submission_status = not activity.submission_status
        activity.save()

        # Serialize the updated activity
        serializer = ActivitySerializer(activity)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'])
    def get_submitted_activities_by_class(self, request):
        class_id = request.query_params.get('class_id')

        if class_id is None:
            return Response(
                {"error": "The 'class_id' query parameter is required."},
                status=status.HTTP_BAD_REQUEST
            )

        try:
            # Fetch the class based on the provided 'class_id'
            class_instance = Class.objects.get(pk=class_id)
            
            # Get all teams that belong to the specified class
            teams_in_class = Team.objects.filter(team_class=class_instance)
            
            # Get all submitted activities in teams of the specified class
            submitted_activities = Activity.objects.filter(
                activity_team__in=teams_in_class, submission_status=True
            )
            
            serializer = ActivitySerializer(submitted_activities, many=True)
            
            return Response(serializer.data)
        except Class.DoesNotExist:
            return Response(
                {"error": f"Class with ID {class_id} not found."},
                status=status.HTTP_NOT_FOUND
            )






        

    # def get_all_activities(self, request):
    #     try:
    #         instances = self.get_queryset()
    #         serializer = ActivitySerializer(instances, many=True)
    #         return Response({"activities": serializer.data})
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # def get_activity_by_id(self, request, id):
    #     try:
    #         instance = self.get_queryset().filter(id=id).first()
    #         serializer = ActivitySerializer(instance)
    #         if instance is None:
    #             return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    #         return Response(serializer.data)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # def create_activity(self, request):
    #     try:
    #         serializer = self.get_serializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     except ValidationError as e:
    #         return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def update_activity(self, request, id):
    #     try:
    #         instance = self.get_queryset().filter(id=id).first()
    #         if instance is None:
    #             return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    #         serializer = self.get_serializer(instance, data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_update(serializer)
    #         return Response(serializer.data)
    #     except ValidationError as e:
    #         return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # def delete_activity(self, request, id):
    #     try:
    #         instance = self.get_queryset().filter(id=id).first()
    #         if instance is None:
    #             return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)
    #         self.perform_destroy(instance)
    #         return Response({"success": "Activity deleted"})
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)