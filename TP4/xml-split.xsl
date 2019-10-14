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
                <div class="w3-container">
                    <h1 class="w3-center">Indice de Aquessitios</h1>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="CONCEL"/>
                        </xsl:apply-templates>
                    </ul>
                </div>
            </body>
            <xsl:apply-templates/>
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
   
    
    <xsl:template match="ARQELEM[not(preceding::CONCEL=./CONCEL)]" mode="indice">
        <li class="w3-text-indigo">
            <a href="{translate(CONCEL, ' ', '')}.html">
                <xsl:value-of select="CONCEL"/>
            </a>
        </li>
        <xsl:apply-templates mode="indiceOfConcel" select="CONCEL"/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indiceOfConcel">
        <li class="w3-text-indigo">
            <a  href="{count(preceding-sibling::*)+1}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="CONCEL" mode="indiceOfConcel">
        <xsl:variable name="c" select="."/>
        <xsl:result-document href="html/{translate(., ' ', '')}.html">
            <html>
                <head>
                    <title><xsl:value-of select="."/></title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="w3.css"/>  
                </head>
                <body>
                    <div class="w3-container">
                        <a href="index.html">Voltar atrás</a>
                        <h1 class="w3-center"><xsl:value-of select="."/></h1>
                        <ol>
                            <xsl:apply-templates select="//ARQELEM[CONCEL=$c]" mode="indiceOfConcel">
                                <xsl:sort select="count(preceding-sibling::*)"></xsl:sort>
                            </xsl:apply-templates>
                        </ol>
                    </div>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <xsl:template match="*" priority="-1">
        <xsl:copy>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="*" mode="indice" priority="-1"/>
    <xsl:template match="*" mode="indiceOfConcel" priority="-1"/>
    
</xsl:stylesheet>