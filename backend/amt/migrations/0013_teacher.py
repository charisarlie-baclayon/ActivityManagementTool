# Generated by Django 4.2.6 on 2023-10-17 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0012_alter_class_date_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
    ]
