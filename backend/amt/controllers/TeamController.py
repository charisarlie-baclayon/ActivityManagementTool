from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher
from django.contrib.auth.models import Group
# from amt.models import Student

from amt.models import Team
from amt.serializers import TeamSerializer


class TeamController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = [JWTAuthentication]

    def get_permission(self):
        if self.action in ['add_member', 'create_team']:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
        
        
    @action(detail=False, methods=['POST'])
    def create_team(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

    # @action(detail=True, methods=['post'])
    # def add_members(self, request, pk=None):
    #     try:
    #         team = self.get_object()
    #         student_emails = request.data.get('student_emails', [])

    #         # Filter students by email and get their IDs
    #         student_ids = list(Student.objects.filter(email__in=student_emails).values_list('id', flat=True))

    #         # Associate the selected students with the team by updating their team_id
    #         Student.objects.filter(id__in=student_ids).update(team_id=team.id)

    #         return Response({'success': True, 'message': 'Members added successfully'}, status=status.HTTP_200_OK)
    #     except Team.DoesNotExist:
    #         return Response({'success': False, 'message': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)