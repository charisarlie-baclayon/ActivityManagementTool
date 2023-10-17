# Generated by Django 4.2.6 on 2023-10-17 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0006_alter_activity_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=10000)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='amt.category')),
            ],
        ),
    ]
