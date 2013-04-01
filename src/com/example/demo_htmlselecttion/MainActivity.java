package com.example.demo_htmlselecttion;

import java.lang.reflect.Method;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.ContextMenu;
import android.view.ContextMenu.ContextMenuInfo;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

@SuppressLint("NewApi")
public class MainActivity extends Activity {

	private WebView webView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.activity_main);
	}

//	private void emulateShiftHeld(WebView view) {
//		try {
//			KeyEvent shiftPressEvent = new KeyEvent(0, 0, KeyEvent.ACTION_DOWN,
//					KeyEvent.KEYCODE_SHIFT_LEFT, 0, 0);
//			shiftPressEvent.dispatch(view);
//			Toast.makeText(this, "select_text_now", Toast.LENGTH_SHORT).show();
//		} catch (Exception e) {
//			Log.e("dd", "Exception in emulateShiftHeld()", e);
//		}
//	}

}
