# Generated by Django 4.2.7 on 2023-11-06 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0012_course_remove_class_course_name_class_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]