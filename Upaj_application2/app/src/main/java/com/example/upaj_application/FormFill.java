package com.example.upaj_application;

import static com.example.upaj_application.Utils.FirebaseUtil.currentUserId;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
//import androidx.room.jarjarred.org.stringtemplate.v4.Interpreter;
import org.tensorflow.lite.Interpreter;

import com.example.upaj_application.Utils.AndroidUtil;
import com.example.upaj_application.Utils.FirebaseUtil;
import com.example.upaj_application.model.FormSubmitModel;
import com.google.firebase.Timestamp;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Arrays;

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
public class FormFill extends AppCompatActivity {

    WebView webView;

    private String url;

    ValueCallback<Uri[]> upload;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_predictdisease);
        url = "https://predictcrop.streamlit.app/";
        webView = findViewById(R.id.webvwe);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl(url);
        webView.setWebViewClient(new Myweb());

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                super.onShowFileChooser(webView, filePathCallback, fileChooserParams);
                Intent intent;
                intent = fileChooserParams.createIntent();
                upload = filePathCallback;
                startActivityForResult(intent, 101);
                return true;
            }
        });

    }

    public class Myweb extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            view.loadUrl(request.getUrl().toString());
            return true;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 101) {
            if (upload == null) {
                return;
            }
            upload.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            upload = null;
        }
    }
}