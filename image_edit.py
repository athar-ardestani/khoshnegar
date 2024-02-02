from PIL import Image, ImageDraw, ImageFont
import numpy as np
import cv2

# مسیر فایل تصویر
image_path = '1.png'

# باز کردن تصویر
image = cv2.imread(image_path)

# افزودن یک مستطیل به تصویر (مثال: یک مستطیل قرمز با ابعاد و موقعیت دلخواه)
# راست جهت زنجیر
start_point = (1544, 84)
end_point = (1576, 118)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)
# چپ جهت زنجیر
start_point = (1544, 141)
end_point = (1576, 175)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# چپ و راست جهت زنجیر
start_point = (1544, 202)
end_point = (1576, 234)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# بست سقفی 
start_point = (1429, 84)
end_point = (1461, 118)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)
# بست دیواری
start_point = (1429, 141)
end_point = (1461, 175)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# قپه
start_point = (1429, 202)
end_point = (1461, 234)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# دید پنجره
start_point = (1570, 355)
end_point = (1607, 393)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# دید آپن
start_point = (1570, 442)
end_point = (1607, 483)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# سیستم بالا رو گیربکسی
start_point = (1455, 355)
end_point = (1493, 393)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# سیستم بالا رو ریموت 
start_point = (1455, 442)
end_point = (1493, 483)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پرده زبرا ساده 
start_point = (1171, 93)
end_point = (1202, 124)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)



# دو مکانیزم ساده
start_point = (1171, 135)
end_point = (1202, 167)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# شیدرول ساده
start_point = (1171, 180)
end_point = (1202, 211)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# زبرا تصویری هفت سانتی یکرو
start_point = (1171, 224)
end_point = (1202, 256)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# زبرا تصویری هفت سانتی دورو
start_point = (1171, 268)
end_point = (1202, 299)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# زبرا تصویری یک سانتی یکرو
start_point = (1171, 311)
end_point = (1202, 342)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# زبرا تصویری یک سانتی دورو
start_point = (1171, 354)
end_point = (1202, 385)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# زبرا تصویری دو سانتی یکرو
start_point = (1171, 397)
end_point = (1202, 428)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# زبرا تصویری دو سانتی دورو
start_point = (1171, 440)
end_point = (1202, 472)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)






#  دو مکانیزم تصویری هفت سانتی
start_point = (858, 93)
end_point = (889, 124)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


#  دو مکانیزم تصویری هفت سانتی آینه ای
start_point = (858, 135)
end_point = (889, 167)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

#  دو مکانیزم تصویری یک سانتی
start_point = (858, 180)
end_point = (889, 211)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


#  دو مکانیزم تصویری یک سانتی آینه ای
start_point = (858, 224)
end_point = (889, 256)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


#  دو مکانیزم تصویری دو سانتی
start_point = (858, 268)
end_point = (889, 299)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


#  دو مکانیزم تصویری دو سانتی آینه ای
start_point = (858, 311)
end_point = (889, 342)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# شیدرول تصویری
start_point = (858, 354)
end_point = (889, 385)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# سانلیت تصویری
start_point = (858, 397)
end_point = (889, 428)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


#کرکره تصویری 
start_point = (858, 440)
end_point = (889, 472)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)





# پانجی هازان عرض ۱۵۰ 
start_point = (647, 93)
end_point = (678, 124)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پانچی هازان عرض ۳۰۰ 
start_point = (647, 135)
end_point = (678, 167)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)

# پانجی مخمل پورش عرض ۱۵۰ 
start_point = (647, 180)
end_point = (678, 211)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پانجی کالیفرنیا عرض ۱۵۰ 
start_point = (647, 224)
end_point = (678, 256)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پانجی مخمل الیزه عرض ۱۵۰ 
start_point = (647, 268)
end_point = (678, 299)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پانجی ساتن عرض ۱۵۰ 
start_point = (647, 311)
end_point = (678, 342)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# پانجی شاتن عرض ۱۵۰ 
start_point = (647, 354)
end_point = (678, 385)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)





# بدون دوخت
start_point = (409, 224)
end_point = (440, 256)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)


# با دوخت
start_point = (409, 268)
end_point = (440, 299)
color = (0, 0, 255)  # رنگ مستطیل: (B, G, R)
thickness = -1
image = cv2.rectangle(image, start_point, end_point, color, thickness)






# افزودن متن فارسی به تصویر با Pillow
# نام 
text = 'نام مشتری'
font_path = 'tahoma.ttf'
font_size = 35
font_color = (0, 0, 255)  # رنگ متن: (B, G, R)

# تبدیل تصویر OpenCV به تصویر Pillow
image_pil = Image.fromarray(image)

# استفاده از فونت
font = ImageFont.truetype(font_path, font_size)
draw = ImageDraw.Draw(image_pil)
draw.text((1700, 50), text, font=font, fill=font_color,align="right")

# تبدیل تصویر Pillow به تصویر OpenCV
image_with_text = np.array(image_pil)





# افزودن متن فارسی به تصویر با Pillow
# کد 
text = 'کد '
font_path = 'tahoma.ttf'
font_size = 35
font_color = (0, 0, 255)  # رنگ متن: (B, G, R)

# تبدیل تصویر OpenCV به تصویر Pillow
image_pil = Image.fromarray(image_with_text)

# استفاده از فونت
font = ImageFont.truetype(font_path, font_size)
draw = ImageDraw.Draw(image_pil)
draw.text((1700, 180), text, font=font, fill=font_color,align="right")

# تبدیل تصویر Pillow به تصویر OpenCV
image_with_text = np.array(image_pil)




# افزودن متن فارسی به تصویر با Pillow
# عرض 
text = 'عرض'
font_path = 'tahoma.ttf'
font_size = 35
font_color = (0, 0, 255)  # رنگ متن: (B, G, R)

# تبدیل تصویر OpenCV به تصویر Pillow
image_pil = Image.fromarray(image_with_text)

# استفاده از فونت
font = ImageFont.truetype(font_path, font_size)
draw = ImageDraw.Draw(image_pil)
draw.text((1700, 290), text, font=font, fill=font_color,align="right")

# تبدیل تصویر Pillow به تصویر OpenCV
image_with_text = np.array(image_pil)




# افزودن متن فارسی به تصویر با Pillow
# ارتفاع 
text = 'ارتفاع '
font_path = 'tahoma.ttf'
font_size = 35
font_color = (0, 0, 255)  # رنگ متن: (B, G, R)

# تبدیل تصویر OpenCV به تصویر Pillow
image_pil = Image.fromarray(image_with_text)

# استفاده از فونت
font = ImageFont.truetype(font_path, font_size)
draw = ImageDraw.Draw(image_pil)
draw.text((1700, 400), text, font=font, fill=font_color,align="right")

# تبدیل تصویر Pillow به تصویر OpenCV
image_with_text = np.array(image_pil)


# افزودن متن فارسی به تصویر با Pillow
# توضیحات
text = 'سلام، OpenCV!'
font_path = 'tahoma.ttf'
font_size = 20
font_color = (0, 0, 255)  # رنگ متن: (B, G, R)

# تبدیل تصویر OpenCV به تصویر Pillow
image_pil = Image.fromarray(image_with_text)

# استفاده از فونت
font = ImageFont.truetype(font_path, font_size)
draw = ImageDraw.Draw(image_pil)
draw.multiline_text((220, 130), text, font=font, fill=font_color,align="right")

# تبدیل تصویر Pillow به تصویر OpenCV
image_with_text = np.array(image_pil)

# نمایش تصویر حاصل
cv2.imshow('Image with Annotations', image_with_text)
cv2.waitKey(0)
cv2.destroyAllWindows()
