import React, { useState } from 'react';
import { Copy, Check, Folder, FileCode, Terminal, ShieldCheck, ArrowLeft } from 'lucide-react';

interface SourceFile {
  name: string;
  path: string;
  type: string;
  content: string;
}

export const AndroidSourceViewer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const files: SourceFile[] = [
    {
      name: 'AdminLoginScreen.kt',
      path: 'android/app/src/main/java/online/digitaldostcenter/app/ui/screens/AdminLoginScreen.kt',
      type: 'Jetpack Compose Screen',
      content: `package online.digitaldostcenter.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.*
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import online.digitaldostcenter.app.ui.theme.*

@Composable
fun AdminLoginScreen(
    onProceedToAuth: (username: String) -> Unit
) {
    // Both username and password are completely empty by default
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isPasswordVisible by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var isAuthenticating by remember { mutableStateOf(false) }

    fun handleSignIn() {
        val u = username.trim()
        val p = password.trim()
        if (u.isEmpty()) {
            errorMessage = "Please enter your username"
            return
        }
        if (p.isEmpty()) {
            errorMessage = "Please enter your password"
            return
        }
        isAuthenticating = true
        onProceedToAuth(u)
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundWhite)
            .statusBarsPadding(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                modifier = Modifier.size(64.dp),
                shape = RoundedCornerShape(16.dp),
                color = PrimaryBlue
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text("DDC", fontWeight = FontWeight.Black, fontSize = 20.sp, color = Color.White)
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text("Digital Dost Centre", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = MainText)
            Text("Admin Portal", fontSize = 15.sp, fontWeight = FontWeight.SemiBold, color = PrimaryBlue)
            Text("Sign in to manage your website", fontSize = 13.sp, color = SecondaryText)

            Spacer(modifier = Modifier.height(32.dp))

            OutlinedTextField(
                value = username,
                onValueChange = { username = it },
                label = { Text("Username") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Password") },
                singleLine = true,
                visualTransformation = if (isPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    IconButton(onClick = { isPasswordVisible = !isPasswordVisible }) {
                        Icon(if (isPasswordVisible) Icons.Filled.Visibility else Icons.Filled.VisibilityOff, contentDescription = null)
                    }
                },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(20.dp))

            Button(
                onClick = { handleSignIn() },
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Sign In", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
            }
        }
    }
}`,
    },
    {
      name: 'AdminDashboardScreen.kt',
      path: 'android/app/src/main/java/online/digitaldostcenter/app/ui/screens/AdminDashboardScreen.kt',
      type: 'Jetpack Compose Screen',
      content: `package online.digitaldostcenter.app.ui.screens

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.webkit.*
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import online.digitaldostcenter.app.ui.theme.BackgroundWhite

// Completely removes the extra application header.
// The existing website header and mobile sidebar render directly under the Android status bar.
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun AdminDashboardScreen(
    initialTargetUrl: String = "https://digitaldostcenter.online/admin-login",
    onSessionAuthenticated: () -> Unit,
    onSessionExpired: () -> Unit
) {
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var canGoBack by remember { mutableStateOf(false) }

    BackHandler(enabled = canGoBack) {
        webViewInstance?.goBack()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundWhite)
            .statusBarsPadding()
            .navigationBarsPadding()
    ) {
        AndroidView(
            factory = { ctx ->
                WebView(ctx).apply {
                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        allowContentAccess = true
                        mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
                    }
                    CookieManager.getInstance().apply {
                        setAcceptCookie(true)
                        setAcceptThirdPartyCookies(this@apply, true)
                    }

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                            val uri = request?.url ?: return false
                            val host = uri.host?.lowercase() ?: ""
                            if (host.contains("digitaldostcenter.online") || host.contains("firebaseapp.com")) {
                                return false
                            }
                            ctx.startActivity(Intent(Intent.ACTION_VIEW, uri))
                            return true
                        }
                        override fun onPageFinished(view: WebView?, url: String?) {
                            canGoBack = view?.canGoBack() ?: false
                            val current = url?.lowercase() ?: ""
                            if (current.contains("admin.html")) {
                                onSessionAuthenticated()
                            }
                        }
                    }

                    webChromeClient = object : WebChromeClient() {
                        override fun onShowFileChooser(
                            webView: WebView?,
                            filePathCallback: ValueCallback<Array<Uri>>?,
                            fileChooserParams: FileChooserParams?
                        ): Boolean {
                            fileChooserParams?.createIntent()?.let { ctx.startActivity(it); return true }
                            return false
                        }
                    }

                    loadUrl(initialTargetUrl)
                    webViewInstance = this
                }
            },
            modifier = Modifier.fillMaxSize()
        )
    }
}`,
    },
    {
      name: 'MainActivity.kt',
      path: 'android/app/src/main/java/online/digitaldostcenter/app/MainActivity.kt',
      type: 'Entry Point Activity',
      content: `package online.digitaldostcenter.app

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.*
import online.digitaldostcenter.app.ui.navigation.AdminScreen
import online.digitaldostcenter.app.ui.screens.*
import online.digitaldostcenter.app.ui.theme.DigitalDostCentreTheme

class MainActivity : ComponentActivity() {
    private val prefsName = "ddc_admin_prefs"
    private val keyIsAuthenticated = "is_authenticated"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val prefs = getSharedPreferences(prefsName, Context.MODE_PRIVATE)
        // Login persistence: keep admin signed in across app restarts
        val isInitiallyAuthenticated = prefs.getBoolean(keyIsAuthenticated, false)

        setContent {
            DigitalDostCentreTheme {
                val navController = rememberNavController()
                val startDestination = if (isInitiallyAuthenticated) AdminScreen.Dashboard.route else AdminScreen.Login.route

                NavHost(navController = navController, startDestination = startDestination) {
                    composable(AdminScreen.Login.route) {
                        AdminLoginScreen(
                            onProceedToAuth = {
                                navController.navigate(AdminScreen.Dashboard.route) {
                                    popUpTo(AdminScreen.Login.route) { inclusive = true }
                                }
                            }
                        )
                    }
                    composable(AdminScreen.Dashboard.route) {
                        val targetUrl = if (isInitiallyAuthenticated) "https://digitaldostcenter.online/admin.html" else "https://digitaldostcenter.online/admin-login"
                        AdminDashboardScreen(
                            initialTargetUrl = targetUrl,
                            onSessionAuthenticated = { prefs.edit().putBoolean(keyIsAuthenticated, true).apply() },
                            onSessionExpired = {
                                prefs.edit().putBoolean(keyIsAuthenticated, false).apply()
                                navController.navigate(AdminScreen.Login.route)
                            }
                        )
                    }
                }
            }
        }
    }
}`,
    },
  ];

  const [selectedFile, setSelectedFile] = useState<SourceFile>(files[0]);

  const copyToClipboard = (content: string, name: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="p-4 space-y-4 pb-12 bg-white text-[#172033]">
      <div className="flex items-center justify-between border-b border-[#D7DEE8] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-[#D7DEE8] hover:bg-[#F8FAFC] text-[#172033]"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-[#172033]">Native Android Project Files</h1>
            <p className="text-xs text-[#64748B]">Kotlin & Jetpack Compose (Clean Light Theme)</p>
          </div>
        </div>
      </div>

      {/* Build Instructions */}
      <div className="p-3.5 rounded-xl border border-[#D7DEE8] bg-[#F8FAFC] space-y-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#2563EB]" />
          <span className="text-xs font-bold text-[#172033]">Android Studio Build Instructions</span>
        </div>
        <div className="bg-white border border-[#D7DEE8] p-2.5 rounded-lg font-mono text-[11px] text-[#172033] space-y-1">
          <div>$ cd android</div>
          <div>$ ./gradlew assembleDebug      # Builds debug APK</div>
          <div>$ ./gradlew assembleRelease    # Builds release APK</div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Server-side authentication enforced. No hardcoded credentials.</span>
        </div>
      </div>

      {/* File selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {files.map((file) => {
          const isSelected = selectedFile.name === file.name;
          return (
            <button
              key={file.name}
              onClick={() => setSelectedFile(file)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#D7DEE8] text-[#172033] hover:bg-[#E2E8F0]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Code viewer */}
      <div className="rounded-xl border border-[#D7DEE8] bg-white overflow-hidden">
        <div className="px-3.5 py-2 bg-[#F8FAFC] border-b border-[#D7DEE8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] truncate max-w-[240px]">
            <Folder className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="truncate">{selectedFile.path}</span>
          </div>
          <button
            onClick={() => copyToClipboard(selectedFile.content, selectedFile.name)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-semibold transition-colors"
          >
            {copiedFile === selectedFile.name ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-3.5 text-[11px] font-mono leading-relaxed overflow-x-auto max-h-96 text-[#172033] bg-white">
          <code>{selectedFile.content}</code>
        </pre>
      </div>
    </div>
  );
};
