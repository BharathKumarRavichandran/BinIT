import os
import barcode
import datetime
import random
import string
import sys

from barcode.writer import ImageWriter

# Globals settings
barcode_type = 'code128'

# Set input params
hospital_id     = sys.argv[1]
waste_type      = sys.argv[2]
weight          = sys.argv[3]
wmc_center_name = sys.argv[4]

# Set date and time params
date_today = datetime.datetime.now().strftime('%d-%m-%Y')
datetime_now = datetime.datetime.now().strftime("%Y-%m-%d-%H:%M:%S")
date_today = str(date_today)
datetime_now = str(datetime_now)

print_data = ("{} {} {}Kg {}").format(hospital_id,waste_type,str(weight),date_today)

# Write image
code128 = barcode.get_barcode_class(barcode_type)
barcode_image = code128(print_data, writer=ImageWriter())

# Set final barcode image path
barcode_image_dir = '/home/teslash21/CS/Github/BinIT-UI/public/images/barcode'
barcode_image_name = ("{}_{}_{}_{}").format(hospital_id,waste_type,weight,datetime_now)
barcode_image_path = os.path.join(barcode_image_dir,barcode_image_name)

barcode_image.save(barcode_image_path)
print(os.path.join('images','barcode',barcode_image_name),end=".png")
