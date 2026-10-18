package online.digitaldostcenter.app

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import online.digitaldostcenter.app.ui.navigation.AdminScreen
import online.digitaldostcenter.app.ui.screens.AdminDashboardScreen
import online.digitaldostcenter.app.ui.screens.AdminLoginScreen
import online.digitaldostcenter.app.ui.theme.BackgroundWhite
import online.digitaldostcenter.app.ui.theme.DigitalDostCentreTheme

class MainActivity : ComponentActivity() {

    private val prefsName = "ddc_admin_prefs"
    private val keyIsAuthenticated = "is_authenticated"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val prefs = getSharedPreferences(prefsName, Context.MODE_PRIVATE)
        // Login Persistence: Sign In Once
        // Check if admin is already authenticated from a previous session
        val isInitiallyAuthenticated = prefs.getBoolean(keyIsAuthenticated, false)

        setContent {
            DigitalDostCentreTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = BackgroundWhite
                ) {
                    val navController = rememberNavController()

                    val startDestination = if (isInitiallyAuthenticated) {
                        AdminScreen.Dashboard.route
                    } else {
                        AdminScreen.Login.route
                    }

                    NavHost(
                        navController = navController,
                        startDestination = startDestination
                    ) {
                        // 1. Clean Light Professional Admin Login Screen
                        composable(AdminScreen.Login.route) {
                            AdminLoginScreen(
                                onProceedToAuth = { _ ->
                                    navController.navigate(AdminScreen.Dashboard.route) {
                                        popUpTo(AdminScreen.Login.route) { inclusive = true }
                                    }
                                }
                            )
                        }

                        // 2. Authenticated Admin Dashboard (Direct Website Interface - NO EXTRA APP HEADER)
                        composable(AdminScreen.Dashboard.route) {
                            val targetUrl = if (isInitiallyAuthenticated) {
                                "https://digitaldostcenter.online/admin.html"
                            } else {
                                "https://digitaldostcenter.online/admin-login"
                            }

                            AdminDashboardScreen(
                                initialTargetUrl = targetUrl,
                                onSessionAuthenticated = {
                                    prefs.edit().putBoolean(keyIsAuthenticated, true).apply()
                                },
                                onSessionExpired = {
                                    prefs.edit().putBoolean(keyIsAuthenticated, false).apply()
                                    navController.navigate(AdminScreen.Login.route) {
                                        popUpTo(AdminScreen.Dashboard.route) { inclusive = true }
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
