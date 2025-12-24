import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // --- PROFILE CARD ---
    cardProfile: {
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 16,
        elevation: 3,
    },

    // --- AVATAR ---
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: "#ffffff",
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#e5e7eb",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },

    // --- EDIT AVATAR BUTTON ---
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#2563eb",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    loadingIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderTopColor: "transparent",
    },

    // --- NAME & EMAIL ---
    name: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
        textAlign: "center",
    },
    email: {
        fontSize: 15,
        opacity: 0.7,
        textAlign: "center",
    },

    // --- SECTION CARD ---
    cardSections: {
        marginTop: 20,
        paddingVertical: 8,
        marginHorizontal: 16,
        borderRadius: 16,
        elevation: 4,
    },

    cardSectionTitle: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        paddingHorizontal: 20,
        paddingVertical: 14,
        opacity: 0.9,
    },

    // --- MENU ITEM ---
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemText: {
        fontSize: 16,
        marginLeft: 14,
    },

    // --- LOGOUT BUTTON (if reused) ---
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        paddingVertical: 14,
        backgroundColor: "#ef4444",
        borderRadius: 14,
        marginHorizontal: 16,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
        color: "#fff",
    },

    // --- FOOTER ---
    footer: {
        alignItems: "center",
        paddingVertical: 24,
    },
    footerText: {
        fontSize: 14,
        opacity: 0.5,
    },
})
