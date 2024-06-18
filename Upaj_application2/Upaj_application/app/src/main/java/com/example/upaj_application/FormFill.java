package com.example.upaj_application;

import static com.example.upaj_application.Utils.FirebaseUtil.currentUserId;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import com.example.upaj_application.Utils.AndroidUtil;
import com.example.upaj_application.Utils.FirebaseUtil;
import com.example.upaj_application.model.FormSubmitModel;
import com.google.firebase.Timestamp;


public class FormFill extends AppCompatActivity {


    FormSubmitModel formSubmitModel;
    EditText username;
    EditText phonenumber;
    EditText emailid;
    EditText region,nitrogen,phosphorus,potassium,temperature,humidity,rainfall,ph,area,season;

    Button submitbtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form_fill);


        username = findViewById(R.id.form_username);
        phonenumber = findViewById(R.id.form_phone);
        emailid = findViewById(R.id.form_email);
        region = findViewById(R.id.form_region);
        nitrogen = findViewById(R.id.form_nitrogen);
        phosphorus = findViewById(R.id.form_phosphorus);
        potassium = findViewById(R.id.form_potassium);
        temperature = findViewById(R.id.form_temperature);
        humidity = findViewById(R.id.form_humidity);
        rainfall = findViewById(R.id.form_rainfall);
        ph = findViewById(R.id.form_ph);
        area = findViewById(R.id.form_area);
        season = findViewById(R.id.form_season);

        submitbtn = findViewById(R.id.form_submit_btn);

        submitbtn.setOnClickListener((v)->{
            formsubmit();
        });

    }

    void formsubmit(){


        String usernam = username.getText().toString();
        String phone = phonenumber.getText().toString();
        String email = emailid.getText().toString();
        String regin = region.getText().toString();
        String nitro = nitrogen.getText().toString();
        String phospho = phosphorus.getText().toString();
        String potass = potassium.getText().toString();
        String temper = temperature.getText().toString();
        String humid = humidity.getText().toString();
        String rain = rainfall.getText().toString();
        String p = ph.getText().toString();
        String ar = area.getText().toString();
        String seasn = season.getText().toString();

        if (usernam.isEmpty() || usernam.length() < 3) {
            username.setError("Username length should be at least 3 chars");
            return;
        }

        formSubmitModel = new FormSubmitModel( phone, usernam, Timestamp.now(), currentUserId(), email,  regin,nitro,phospho,potass,  temper, humid,rain,p,ar,seasn);
        formSubmitModel.setUsername(usernam);
        formSubmitModel.setPhone(phone);
        formSubmitModel.setRegion(regin);
        formSubmitModel.setNitrogen(nitro);
        formSubmitModel.setPhosphorus(phospho);
        formSubmitModel.setPotassium(potass);
        formSubmitModel.setTemperature(temper);
        formSubmitModel.setHumidity(humid);
        formSubmitModel.setRainfall(rain);
        formSubmitModel.setPh(p);
        formSubmitModel.setArea(ar);
        formSubmitModel.setSeason(seasn);

        updateToFirestore();





    }

    void updateToFirestore(){
        FirebaseUtil.FormSubmit().set(formSubmitModel)
                .addOnCompleteListener(task -> {

                    if(task.isSuccessful()){
                        AndroidUtil.showToast(this,
                                "Form Submitted Successfully");
                        Intent intent = new Intent(FormFill.this, FormActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                    }
                    else{
                        AndroidUtil.showToast(this," Failed");
                    }
                });
    }


}