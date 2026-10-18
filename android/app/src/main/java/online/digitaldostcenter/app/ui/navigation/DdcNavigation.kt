package online.digitaldostcenter.app.ui.navigation

sealed class DdcScreen(val route: String) {
    data object Home : DdcScreen("home")
    data object Categories : DdcScreen("categories")
    data object Saved : DdcScreen("saved")
    data object More : DdcScreen("more")
    data object Notifications : DdcScreen("notifications")
    data object Tools : DdcScreen("tools")
    data object PostDetail : DdcScreen("post/{postId}") {
        fun createRoute(postId: String) = "post/$postId"
    }
}
