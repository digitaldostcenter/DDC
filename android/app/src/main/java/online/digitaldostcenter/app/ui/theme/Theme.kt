package online.digitaldostcenter.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val CleanLightColorScheme = lightColorScheme(
    primary = PrimaryBlue,
    onPrimary = BackgroundWhite,
    primaryContainer = InputBackground,
    onPrimaryContainer = MainText,
    secondary = PrimaryBlueHover,
    onSecondary = BackgroundWhite,
    background = BackgroundWhite,
    onBackground = MainText,
    surface = BackgroundWhite,
    onSurface = MainText,
    surfaceVariant = InputBackground,
    onSurfaceVariant = SecondaryText,
    outline = InputBorder,
    outlineVariant = CardBorder,
    error = ErrorRed,
    onError = BackgroundWhite
)

@Composable
fun DigitalDostCentreTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = CleanLightColorScheme,
        typography = Typography,
        content = content
    )
}
