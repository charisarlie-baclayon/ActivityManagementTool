# Generated by Django 4.2.6 on 2023-10-17 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0014_team'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='class_team',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='amt.class'),
        ),
    ]
