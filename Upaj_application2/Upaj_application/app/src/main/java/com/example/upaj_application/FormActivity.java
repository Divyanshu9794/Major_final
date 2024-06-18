package com.example.upaj_application;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class FormActivity extends AppCompatActivity {
    Button predictionForm;

    BottomNavigationView bottomNavigationView;


    Button chat_with_executive;
//    Button userdashboard;
    Button profile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form);

        predictionForm = findViewById(R.id.prediction_form);
        chat_with_executive =findViewById(R.id.chat_with_executive);
        profile=findViewById(R.id.profile);
//        userdashboard = findViewById(R.id.user_dashboard);

        chat_with_executive.setOnClickListener((v)->{
            startActivity(new Intent(FormActivity.this,MainActivity.class));
        });

        profile.setOnClickListener((v)->{
            startActivity(new Intent(FormActivity.this,MainActivity.class));
        });

        predictionForm.setOnClickListener((v)->{
            startActivity(new Intent(FormActivity.this,FormFill.class));
        });

//        userdashboard.setOnClickListener((v)->{
//            startActivity((new Intent(FormActivity.this,UserDashboard.class)));
//        });






    }

    
    
}