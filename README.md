# Fullstack-Assignment-Pantchanit

## วิธีการติดตั้ง

1. รันคำสั่ง git clone https://github.com/pant411/fullstack-assignment-pantchanit.git 

2.	รันคำสั่ง docker-compose up -d
3.	เข้าไปที่ phpMyAdmin (http://localhost:8081) 
    Username: root
    Password: mlkgsnghlsgehioneiogkjhn
    เมื่อ login สำเร็จให้เข้าไปที่ database: db-university เพื่อ import โครงสร้างของระบบฐานข้อมูลจากไฟล์ db-university.sql (https://github.com/pant411/fullstack-assignment-pantchanit/blob/main/database/db-university.sql) 

## Backend
พัฒนาด้วย Nestjs, MySQL, และ Typeorm
- URL: http://localhost:3000
- API Document: http://localhost:3000/api/v1/docs
- phpMyAdmin: http://localhost:8081
  
## Frontend
พัฒนาด้วย Nextjs, React, Tailwind CSS, และ Daisy UI
- URL: http://localhost:3001
  
## ER diagram
![alt text](https://github.com/pant411/fullstack-assignment-pantchanit/blob/main/database/Full-Stack-Test-Pantchanit.drawio.png?raw=true)
