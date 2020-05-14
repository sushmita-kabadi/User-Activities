import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','practice_project.settings')

import django
django.setup()
from faker import Faker
fakegen = Faker()

from practice_app.models import User
def populate(N=5):
    for entry in range(N):
        fake_first_name = fakegen.name()
        fake_last_name = fakegen.name()
        fake_email = fakegen.email()
        user_info = User.objects.get_or_create(first_name = fake_first_name , last_name = fake_last_name , email = fake_email)
if __name__ == "__main__":
    print("Populating script")
    populate(20)
    print("Populating complete!")
