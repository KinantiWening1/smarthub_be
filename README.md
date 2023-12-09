# SMARTHUB COWORKING SPACE
Disusun oleh Kelompok 9 K02 yang beranggotakan :
- Kinanti Wening Asih / 18221044
- Michelle Lim / 18221052
- Esther Regina / 18221086
- Angela Geraldine Hasian Panjaitan / 18221158

## Penjelasan Singkat Layanan
SmartHub adalah konsep coworking space inovatif yang menggabungkan teknologi informasi, efisiensi operasional, dan pengalaman berkolaborasi yang unik. SmartHub adalah lingkungan kerja bersama yang dilengkapi dengan perangkat-perangkat pintar dan sistem terintegrasi yang memungkinkan pengguna untuk dengan mudah mendaftar, mengakses fasilitas, mengelola keanggotaan, berinteraksi dengan komunitas, dan mengelola keuangan mereka dengan cara yang efisien dan nyaman. Dengan teknologi seperti payment gateway, situs web informasi coworking space, dan sistem pengelolaan keuangan, SmartHub memberikan layanan yang lebih pintar, terhubung, dan terkendali. Hal ini mampu menciptakan lingkungan kerja yang mendukung produktivitas, inovasi, dan kolaborasi di era digital.

## Cara menjalankan aplikasi untuk development backend pada localhost
1. Jalankan command ```npm install``` pada terminal untuk menginstal semua modul yang diperlukan untuk menjalankan aplikasi.

2. Buatlah file ```.env``` pada root folder.

    file .env :
    ```
    # Environment variables declared in this file are automatically made available to Prisma.
    # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

    # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    # See the documentation for all the connection string options: https://pris.ly/d/connection-strings

    DATABASE_URL="postgresql://postgres:Lastismart2023!@db.oxpusynyzlfpzhalnhef.supabase.co:5432/postgres"
    ```

3. Untuk menjalankan aplikasi secara lokal, jalankan ```npm run dev```.

4. Test keberjalanan backend aplikasi menggunakan ```Postman```.

## Cara menjalankan aplikasi untuk development frontend pada localhost
1. Jalankan command ```npm install``` pada terminal untuk menginstal semua modul yang diperlukan untuk menjalankan aplikasi.

2. Jalankan ```npm run dev``` untuk menjalankan aplikasi.

3. Buka ```localhost:3000``` pada browser untuk mengakses frontend aplikasi dan memantau perubahan yang dilakukan terhadap source code.

## Cara menjalankan aplikasi secara remote melalui web address yang telah di-deploy
1. Buka https://smarthubcoworking.netlify.app/
