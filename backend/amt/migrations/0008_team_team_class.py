# Generated by Django 4.2.7 on 2023-11-02 04:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0007_alter_comment_activity_alter_comment_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='team_class',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='amt.class'),
            preserve_default=False,
        ),
    ]
