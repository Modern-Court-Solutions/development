from rest_framework import permissions

class GroupPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        if request.user.groups.filter(name='TEST').exists():
            return True
        return False
