package online.digitaldostcenter.app.ui.navigation

sealed class AdminScreen(val route: String) {
    data object Login : AdminScreen("admin_login")
    data object Dashboard : AdminScreen("admin_dashboard")
}
