from django import template

register = template.Library()

@register.filter
def clp(value):
    try:
        value = int(float(value))
        return f'CLP$ {value:,}'.replace(',', 'X').replace('.', ',').replace('X', '.')
    except (ValueError, TypeError):
        return value
