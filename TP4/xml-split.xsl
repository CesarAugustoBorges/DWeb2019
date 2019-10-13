<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <head>
                <title>Indice</title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="w3.css"/>     
            </head>
            <body>
                    <h1>Indice de Aquessitios</h1>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="normalize-space(CONCEL)"/>
                        </xsl:apply-templates>
                    </ul>
                
                <xsl:apply-templates/>
            </body>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ARQELEM">     
        <xsl:result-document href="dataset/arq{count(preceding-sibling::*)+1}.xml">
            <xsl:processing-instruction name="xml-stylesheet" >type="text/xsl" href="arq2html.xsl"</xsl:processing-instruction>
            <xsl:copy>
                <xsl:apply-templates/>
            </xsl:copy>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="text()">
        <xsl:value-of select="normalize-space(.)"/>
    </xsl:template>
    
    <xsl:template match="*" priority="-1">
        <xsl:copy>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <xsl:value-of select="CONCEL"/> - <xsl:value-of select="count(preceding-sibling::*)+1"/>
        </li>
    </xsl:template>
    
</xsl:stylesheet>