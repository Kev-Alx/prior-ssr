<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->timestamps();
            $table->string('author');
            $table->foreignUuid('category_id')->nullable()->references('uuid')->on('categories')->onDelete('set null');
            $table->string('title');
            $table->string('slug');
            $table->string('description');
            $table->integer('read_time');
            $table->text('main_image');
            $table->date('publish_date');
            $table->text('content')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('main_featured')->default(false);
            $table->boolean('category_featured')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
