# Generated by Django 4.2.7 on 2023-11-06 09:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0013_alter_course_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='template',
            name='course',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='amt.course'),
            preserve_default=False,
        ),
    ]
