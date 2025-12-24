import { StyleSheet } from "react-native";

export const stylesEditModal = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
    },
    cancelButton: {
        fontSize: 16,
        color: "#6b7280",
    },
    saveButton: {
        fontSize: 16,
        color: "#2563eb",
        fontWeight: "600",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    form: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: "#f9fafb",
    },
    inputError: {
        borderColor: "#ef4444",
    },
    errorText: {
        color: "#ef4444",
        fontSize: 14,
        marginTop: 4,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor: "rgba(255, 255, 255, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#6b7280",
    },

    footer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#fff',
    },

    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        alignItems: 'center',
    },

    saveBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#2563eb',
        alignItems: 'center',
    },

    cancelText: {
        color: '#374151',
        fontWeight: '600',
    },

    saveText: {
        color: '#fff',
        fontWeight: '600',
    },


})