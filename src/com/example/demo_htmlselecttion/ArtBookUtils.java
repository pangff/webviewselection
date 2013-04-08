package com.example.demo_htmlselecttion;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;
import android.content.res.AssetManager.AssetInputStream;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.os.Environment;
import android.util.Log;
import android.view.View;

/**
 * Created with IntelliJ IDEA.
 * User: marshal
 * Date: 13-3-13
 * Time: 上午11:48
 * To change this template use File | Settings | File Templates.
 */
public class ArtBookUtils {
    
    /**
	 * 获得本地图片
	 * @param native_image
	 * @return
	 */
	public static InputStream getNativeFile(String native_image,int height,int width) {
		if (native_image == null || native_image.equals("")) {
			return null;
		}
		File file = new File(native_image);
		if (file.exists()) {
			
			try {
				String  strCss = "";
				ByteArrayOutputStream outStream = new  ByteArrayOutputStream();
				FileInputStream is = new FileInputStream(file);
				int count = -1;
				byte buffer[] = new byte[2048] ;
				if(is!=null){
					Log.v("ArtBook", "－－文件读取成功－－");
					while((count = is.read(buffer, 0, 2048))!=-1){
						outStream.write(buffer, 0,count);
					}
					buffer = null;
					String str = new String(outStream.toByteArray());
					Log.v("ArtBook", str);
					String str1 = str.replaceAll("temp_height", height+"px");
					Log.v("ArtBook", "str:"+str1);
					strCss = str1.replaceAll("temp_width", width+"px");
					Log.v("ArtBook", "str:"+strCss);				}
				return new ByteArrayInputStream(strCss.getBytes());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		} else {
			return null;
		}
	}
	
	
	
	

	public static InputStream  changeWidthAndHeight(Context contex,String cssfile,int width,int height){
		try {
			String  strCss = "";
			ByteArrayOutputStream outStream = new  ByteArrayOutputStream();
			InputStream is = contex.getAssets().open(cssfile);
			int count = -1;
			byte buffer[] = new byte[2048] ;
			if(is!=null){
				Log.v("ArtBook", "－－文件读取成功－－");
				while((count = is.read(buffer, 0, 2048))!=-1){
					outStream.write(buffer, 0,count);
				}
				buffer = null;
				String str = new String(outStream.toByteArray());
				Log.v("ArtBook", str);
				String str1 = str.replaceAll("temp_height", height+"px");
				String str2 = str1.replaceAll("temp_image_width", width-80+"px");
				Log.v("ArtBook", "str:"+str1);
				strCss = str2.replaceAll("temp_width", width+"px");
				Log.v("ArtBook", "str:"+strCss);
			}
			return new ByteArrayInputStream(strCss.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}
	

    /**
	 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
	 */
	public static int dip2px(Context context, float dpValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (dpValue * scale + 0.5f);
	}

	/**
	 * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
	 */
	public static int px2dip(Context context, float pxValue) {
		final float scale = context.getResources().getDisplayMetrics().density;
		return (int) (pxValue / scale + 0.5f);
	}
    public static Bitmap loadBitmapFromView(View v, int width, int height) {
        v.measure(View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
                View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
        long time=System.currentTimeMillis();
        Bitmap b = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(b);

        v.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));
        v.layout(0, 0, width, height);
        v.draw(c);

        Log.d("artbook","load bitmap time: "+(System.currentTimeMillis()-time));
        return b;
    }

    public static void saveBitmap(Bitmap bitmap, String fileName) {
        long time=System.currentTimeMillis();
        String filePath = Environment.getExternalStorageDirectory() + "/" + fileName;
        try {
            OutputStream stream = new FileOutputStream(filePath);
            bitmap.compress(Bitmap.CompressFormat.PNG, 80, stream);
            stream.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Log.d("artbook","save bitmap time: "+(System.currentTimeMillis()-time));
    }
}
