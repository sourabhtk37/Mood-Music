from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

cls = get_driver(Provider.DIGITAL_OCEAN)

driver = cls('313ac7abea682a9833ba403e8cfbff62cb6a7f988b451cdb44b21d3ceaa59679', api_version='v2')

options = {'backups': True,
           'private_networking': True,
           'ssh_keys': [123456, 123457]}

name = 'test.domain.tld'
size = driver.list_sizes()[0]
image = driver.list_images()[0]
location = driver.list_locations()[0]

node = driver.create_node(name, size, image, location,ex_create_attr=options)

