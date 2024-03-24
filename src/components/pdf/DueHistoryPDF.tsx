'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        // flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: '10px'
    },
    section: {
        margin: 10,
        padding: 10,
        // flexGrow: 1,
    },
});

// Create Document Component
export const DueHistoryPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: '60px' }}>Section #1</Text>
            </View>

            <Text style={{ fontSize: '10px' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo placeat architecto exercitationem laboriosam est nesciunt magnam facere perferendis natus consectetur, impedit nostrum quos rerum hic, autem error iusto ab blanditiis. Debitis quisquam perferendis eius. Quam, animi eveniet sequi,
            </Text>

        </Page>
    </Document>
);