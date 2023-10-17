# Generated by Django 4.2.6 on 2023-10-17 19:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0009_work'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=10000)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='amt.activity')),
            ],
        ),
    ]
