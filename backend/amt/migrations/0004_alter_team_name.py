# Generated by Django 4.2.6 on 2023-10-19 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0003_remove_team_team_class'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]