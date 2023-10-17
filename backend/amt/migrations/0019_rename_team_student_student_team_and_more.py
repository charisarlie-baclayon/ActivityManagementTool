# Generated by Django 4.2.6 on 2023-10-17 22:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0018_merge_0014_rename_name_template_title_0017_student'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='team',
            new_name='student_team',
        ),
        migrations.RenameField(
            model_name='team',
            old_name='class_team',
            new_name='team_class',
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_class',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='amt.class'),
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='amt.team'),
        ),
    ]
