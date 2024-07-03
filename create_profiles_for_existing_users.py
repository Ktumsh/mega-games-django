# create_profiles_for_existing_users.py
from django.contrib.auth.models import User
from store.models import Profile

for user in User.objects.all():
    if not hasattr(user, 'profile'):
        Profile.objects.create(user=user)
