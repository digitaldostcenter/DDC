package online.digitaldostcenter.app.ui.screens

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Environment
import android.webkit.*
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import online.digitaldostcenter.app.ui.theme.*

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun AdminDashboardScreen(
    initialTargetUrl: String = "https://digitaldostcenter.online/admin-login",
    onSessionAuthenticated: () -> Unit,
    onSessionExpired: () -> Unit
) {
    val context = LocalContext.current
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var canGoBack by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(true) }
    var loadingProgress by remember { mutableStateOf(0) }
    var hasNetworkError by remember { mutableStateOf(false) }
    var networkErrorMessage by remember { mutableStateOf<String?>(null) }

    // Android back navigation handles WebView history
    BackHandler(enabled = canGoBack) {
        if (webViewInstance?.canGoBack() == true) {
            webViewInstance?.goBack()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundWhite)
            .statusBarsPadding()
            .navigationBarsPadding()
    ) {
        if (hasNetworkError) {
            // Clean Light Network Error & Retry Screen
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(BackgroundWhite)
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "Connection Error",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = MainText
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = networkErrorMessage ?: "Unable to connect to digitaldostcenter.online. Please verify your internet connection.",
                        fontSize = 13.sp,
                        color = SecondaryText,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(20.dp))
                    Button(
                        onClick = {
                            hasNetworkError = false
                            isLoading = true
                            webViewInstance?.reload()
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = PrimaryBlue,
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("Retry", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                    }
                }
            }
        } else {
            // The existing website renders directly under the Android status bar.
            // No custom header, no extra app toolbar, no duplicate icons.
            AndroidView(
                factory = { ctx ->
                    WebView(ctx).apply {
                        layoutParams = android.view.ViewGroup.LayoutParams(
                            android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                            android.view.ViewGroup.LayoutParams.MATCH_PARENT
                        )

                        // Secure WebView Configuration
                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            databaseEnabled = true
                            useWideViewPort = true
                            loadWithOverviewMode = true
                            setSupportZoom(true)
                            builtInZoomControls = true
                            displayZoomControls = false
                            allowFileAccess = false
                            allowContentAccess = true
                            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
                            cacheMode = WebSettings.LOAD_DEFAULT
                            userAgentString = "${settings.userAgentString} DDC-Admin-Android/2.0"
                        }

                        // Session Persistence
                        CookieManager.getInstance().apply {
                            setAcceptCookie(true)
                            setAcceptThirdPartyCookies(this@apply, true)
                        }

                        // Handle downloads for PDFs, marksheets and backup exports
                        setDownloadListener { url, userAgent, contentDisposition, mimetype, _ ->
                            try {
                                val request = DownloadManager.Request(Uri.parse(url)).apply {
                                    setMimeType(mimetype)
                                    addRequestHeader("User-Agent", userAgent)
                                    setDescription("Downloading file from DDC Admin Portal")
                                    setTitle(URLUtil.guessFileName(url, contentDisposition, mimetype))
                                    setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                                    setDestinationInExternalPublicDir(
                                        Environment.DIRECTORY_DOWNLOADS,
                                        URLUtil.guessFileName(url, contentDisposition, mimetype)
                                    )
                                }
                                val dm = ctx.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                                dm.enqueue(request)
                                Toast.makeText(ctx, "Download started...", Toast.LENGTH_SHORT).show()
                            } catch (e: Exception) {
                                // Fallback to browser intent
                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                ctx.startActivity(intent)
                            }
                        }

                        // WebViewClient with domain gating and session tracking
                        webViewClient = object : WebViewClient() {
                            override fun shouldOverrideUrlLoading(
                                view: WebView?,
                                request: WebResourceRequest?
                            ): Boolean {
                                val uri = request?.url ?: return false
                                val host = uri.host?.lowercase() ?: ""
                                val scheme = uri.scheme?.lowercase() ?: ""

                                // Allowed secure hosts for DDC Admin and Firebase Auth
                                val isAllowed = host.contains("digitaldostcenter.online") ||
                                        host.contains("firebaseapp.com") ||
                                        host.contains("googleapis.com") ||
                                        host.contains("gstatic.com") ||
                                        host.contains("cloudflare.com")

                                if (scheme == "https" && isAllowed) {
                                    return false // Load in WebView
                                }

                                // External links opened via standard Android intent
                                try {
                                    val intent = Intent(Intent.ACTION_VIEW, uri)
                                    ctx.startActivity(intent)
                                } catch (e: Exception) {
                                    // Ignore invalid external scheme
                                }
                                return true
                            }

                            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                                super.onPageStarted(view, url, favicon)
                                isLoading = true
                                hasNetworkError = false
                                canGoBack = view?.canGoBack() ?: false
                            }

                            override fun onPageFinished(view: WebView?, url: String?) {
                                super.onPageFinished(view, url)
                                isLoading = false
                                canGoBack = view?.canGoBack() ?: false

                                val current = url?.lowercase() ?: ""
                                // When the administrator reaches the authenticated dashboard (admin.html)
                                if (current.contains("admin.html") || (current.contains("admin") && !current.contains("admin-login"))) {
                                    onSessionAuthenticated()
                                }
                            }

                            override fun onReceivedError(
                                view: WebView?,
                                request: WebResourceRequest?,
                                error: WebResourceError?
                            ) {
                                super.onReceivedError(view, request, error)
                                if (request?.isForMainFrame == true) {
                                    isLoading = false
                                    hasNetworkError = true
                                    networkErrorMessage = error?.description?.toString()
                                }
                            }
                        }

                        // WebChromeClient with file chooser support for PDF/image uploads
                        webChromeClient = object : WebChromeClient() {
                            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                                super.onProgressChanged(view, newProgress)
                                loadingProgress = newProgress
                                if (newProgress >= 100) {
                                    isLoading = false
                                }
                            }

                            override fun onShowFileChooser(
                                webView: WebView?,
                                filePathCallback: ValueCallback<Array<Uri>>?,
                                fileChooserParams: FileChooserParams?
                            ): Boolean {
                                try {
                                    val intent = fileChooserParams?.createIntent()
                                    if (intent != null) {
                                        ctx.startActivity(intent)
                                        return true
                                    }
                                } catch (e: Exception) {
                                    filePathCallback?.onReceiveValue(null)
                                }
                                return false
                            }
                        }

                        loadUrl(initialTargetUrl)
                        webViewInstance = this
                    }
                },
                modifier = Modifier.fillMaxSize()
            )

            // Subtle Linear Loading Indicator at the very top edge
            if (isLoading && loadingProgress in 1..99) {
                LinearProgressIndicator(
                    progress = { loadingProgress / 100f },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(2.5.dp),
                    color = PrimaryBlue,
                    trackColor = Color.Transparent
                )
            }
        }
    }
}
