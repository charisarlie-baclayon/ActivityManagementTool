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
from amt.models import Class, Course
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
    # @action(detail=False, methods=['POST'])
    # def create_from_template(self, request):
    #     template_id = request.data.get('template_id', None)
    #     team_id = request.data.get('team_id', None)

    #     if template_id is not None:
    #         try:
    #             template = Template.objects.get(pk=template_id)

    #             # Create a new activity based on the template
    #             new_activity = Activity.create_activity_from_template(template)

    #             # Update additional fields, such as the team and any other desired fields
    #             if team_id:
    #                 try:
    #                     team = Team.objects.get(pk=team_id)
    #                     new_activity.activity_team = team
    #                 except Team.DoesNotExist:
    #                     return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

    #             # Save the updated activity
    #             new_activity.save()

    #             # Serialize the template and activity
    #             template_serializer = TemplateSerializer(template)
    #             activity_serializer = ActivitySerializer(new_activity)

    #             return Response(
    #                 {
    #                     "success": "Activity created from template",
    #                     "activity": activity_serializer.data,
    #                     "template": template_serializer.data
    #                 },
    #                 status=status.HTTP_201_CREATED
    #             )
    #         except Template.DoesNotExist:
    #             return Response({"error": "Template not found"}, status=status.HTTP_404_NOT_FOUND)
    #     else:
    #         return Response({"error": "Template ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def create_from_template(self, request):
        template_id = request.data.get('template_id', None)
        team_id = request.data.get('team_id', None)
        due_date = request.data.get('due_date', None)  # Add due_date to request data
        evaluation = request.data.get('evaluation', None)  # Add evaluation to request data
        total_score = request.data.get('total_score', None)  # Add total_score to request data

        if template_id is not None:
            try:
                template = Template.objects.get(pk=template_id)

                # Create a new activity based on the template
                new_activity = Activity.create_activity_from_template(template)

                # Update additional fields, such as the team and other desired fields
                if team_id:
                    try:
                        team = Team.objects.get(pk=team_id)
                        new_activity.activity_team = team
                    except Team.DoesNotExist:
                        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

                # Update due_date, evaluation, and total_score
                if due_date:
                    new_activity.due_date = due_date
                if evaluation:
                    new_activity.evaluation = evaluation
                if total_score:
                    new_activity.total_score = total_score

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
    # def list(self, request, *args, **kwargs):
    #     team_id = request.query_params.get('team_id')

    #     if team_id is None:
    #         return Response(
    #             {"error": "The 'team_id' query parameter is required."},
    #             status=status.HTTP_BAD_REQUEST
    #         )

    #     try:
    #         activities = Activity.objects.filter(activity_team=team_id)
    #         serializer = ActivitySerializer(activities, many=True)
    #         return Response(serializer.data)
    #     except Team.DoesNotExist:
    #         return Response(
    #             {"error": f"Team with ID {team_id} not found."},
    #             status=status.HTTP_NOT_FOUND
    #         )

    def list(self, request, *args, **kwargs):
        team_id = request.query_params.get('team_id')

        if team_id:
            # Team ID is provided, filter activities by team_id
            try:
                activities = Activity.objects.filter(activity_team=team_id)
                serializer = ActivitySerializer(activities, many=True)
                return Response(serializer.data)
            except Team.DoesNotExist:
                return Response(
                    {"error": f"Team with ID {team_id} not found."},
                    status=status.HTTP_NOT_FOUND
                )
        else:
            # Team ID is not provided, return all activities
            activities = Activity.objects.all()
            serializer = ActivitySerializer(activities, many=True)
            return Response(serializer.data)
        
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

    @action(detail=True, methods=['POST'], permission_classes=[IsTeacher])
    def add_evaluation(self, request, pk=None):
        try:
            activity = Activity.objects.get(pk=pk)
        except Activity.DoesNotExist:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)

        if not activity.submission_status:
            return Response({"error": "Cannot add evaluation to activities with submission status as False"}, status=status.HTTP_400_BAD_REQUEST)

        evaluation_value = request.data.get('evaluation', None)

        if evaluation_value is not None:
            activity.evaluation = evaluation_value
            activity.save()

            serializer = ActivitySerializer(activity)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Evaluation value is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['DELETE'], permission_classes=[IsTeacher])
    def delete_evaluation(self, request, pk=None):
        try:
            activity = Activity.objects.get(pk=pk)
        except Activity.DoesNotExist:
            return Response({"error": "Activity not found"}, status=status.HTTP_404_NOT_FOUND)

        if not activity.submission_status:
            return Response({"error": "Cannot delete evaluation for activities with submission status as False"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the evaluation to None to delete it
        activity.evaluation = None
        activity.save()

        serializer = ActivitySerializer(activity)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'])
    def get_activities_by_course(self, request):
        course_id = request.query_params.get('course_id')

        if course_id is None:
            return Response(
                {"error": "The 'course_id' query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Fetch the course based on the provided 'course_id'
            course_instance = Course.objects.get(pk=course_id)

            # Get all classes belonging to the specified course
            classes_in_course = Class.objects.filter(course=course_instance)

            # Get all teams in those classes
            teams_in_classes = Team.objects.filter(team_class__in=classes_in_course)

            # Get all activities in teams of those classes
            activities = Activity.objects.filter(activity_team__in=teams_in_classes)

            serializer = ActivitySerializer(activities, many=True)

            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response(
                {"error": f"Course with ID {course_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )
    @action(detail=False, methods=['GET'])
    def get_submitted_activities_by_course(self, request):
        course_id = request.query_params.get('course_id')

        if course_id is None:
            return Response(
                {"error": "The 'course_id' query parameter is required."},
                status=status.HTTP_BAD_REQUEST
            )

        try:
            # Fetch the course based on the provided 'course_id'
            course_instance = Course.objects.get(pk=course_id)

            # Get all classes belonging to the specified course
            classes_in_course = Class.objects.filter(course=course_instance)

            # Get all teams in those classes
            teams_in_classes = Team.objects.filter(team_class__in=classes_in_course)

            # Get all submitted activities in teams of those classes
            submitted_activities = Activity.objects.filter(
                activity_team__in=teams_in_classes, submission_status=True
            )

            serializer = ActivitySerializer(submitted_activities, many=True)

            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response(
                {"error": f"Course with ID {course_id} not found."},
                status=status.HTTP_NOT_FOUND
            )
        
    @action(detail=False, methods=['GET'])
    def get_all_activities(self, request):
        try:
            activities = Activity.objects.all()
            serializer = ActivitySerializer(activities, many=True)
            return Response(serializer.data)
        except Activity.DoesNotExist:
            return Response({"error": "No activities found"}, status=status.HTTP_404_NOT_FOUND)





        

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
        
     # DESTROY ACTIVITY
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Activity.DoesNotExist:
            return Response({'error': 'Activity not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            self.perform_destroy(instance)
        except Exception as e:
            return Response({'error': f'Failed to delete activity. {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_204_NO_CONTENT)