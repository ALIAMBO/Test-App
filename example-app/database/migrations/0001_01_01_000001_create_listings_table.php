<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->double('latitude')->check('latitude >= -90 and latitude <= 90'); // Latitude (-90 to 90)
            $table->double('longitude')->check('longitude >= -180 and longitude <= 180'); // Longitude (-180 to 180)
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // “user_id” field in “listings” table is connected to “id” in “users” table.
        });
    }

    public function down()
    {
        Schema::dropIfExists('listings');
    }
}
