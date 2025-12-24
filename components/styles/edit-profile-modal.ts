import { StyleSheet } from "react-native";

export const stylesEditModal = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        // justifyContent: "space-between",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginHorizontal:10,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        justifyContent:"center",
        textAlign:"center"
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
        width: "100%",
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginTop:8,
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

    footerContainer: {
        padding: 24,
        marginTop: 'auto',
        flexDirection: 'row',
        gap: 12,
    },
    footer: {
        //flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#f9fafb',
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