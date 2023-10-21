# Generated by Django 4.2.5 on 2023-10-21 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth1', '0010_alter_personalizeddata_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personalizeddata',
            name='answer',
        ),
        migrations.AddField(
            model_name='personalizeddata',
            name='answers',
            field=models.JSONField(default=list),
        ),
        migrations.RemoveField(
            model_name='personalizeddata',
            name='question',
        ),
        migrations.AddField(
            model_name='personalizeddata',
            name='question',
            field=models.ManyToManyField(related_name='personalized_data_questions', to='auth1.question'),
        ),
    ]
