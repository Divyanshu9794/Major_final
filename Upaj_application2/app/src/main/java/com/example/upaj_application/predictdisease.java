package com.example.upaj_application;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class predictdisease extends AppCompatActivity {

//    private static final int MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL_STORAGE = 123;
    WebView webView;

    private  String url;

    ValueCallback<Uri[]>upload;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_predictdisease);
        url ="https://plantdiseasepredict.streamlit.app/";
        webView = findViewById(R.id.webvwe);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl(url);
        webView.setWebViewClient(new Myweb());

        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                super.onShowFileChooser(webView, filePathCallback, fileChooserParams);
                Intent intent;
                intent = fileChooserParams.createIntent();
                upload=filePathCallback;
                startActivityForResult(intent,101);
                return true;
            }
        });

    }

    public class Myweb extends WebViewClient{
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request){
            view.loadUrl(request.getUrl().toString());
            return true;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==101){
            if(upload==null){
                return;
            }
            upload.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode,data));
            upload=null;
        }
    }
}
