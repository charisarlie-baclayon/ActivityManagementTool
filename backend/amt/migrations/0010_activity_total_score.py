# Generated by Django 4.2.6 on 2023-11-02 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0009_activity_evaluation'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='total_score',
            field=models.IntegerField(null=True),
        ),
    ]
