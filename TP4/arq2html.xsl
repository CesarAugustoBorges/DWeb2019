<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQELEM">
        <html>
            <head>
                <title><xsl:value-of select="normalize-space(IDENTI)"/></title>
                <link rel="stylesheet" href="../w3.css"/>  
                <meta charset="UTF-8"/>
            </head>
            <body>
                <div class="w3-container">
                    <address>
                        <a href="index.html#{generate-id()}">Voltar atrás</a>
                    </address>
                    <div class="w3-center">
                        <h1><xsl:value-of select="normalize-space(IDENTI)"/> - <xsl:value-of select="CODADM"/></h1>
                        <h2><xsl:value-of select="TIPO/@ASSUNTO"/></h2>
                        <p><xsl:value-of select="DESCRI/LIGA"/></p>
                    </div>
                    <table class="w3-table w3-striped">
                        <tr class="w3-black">
                            <th>Lugar</th>
                            <th>Freguesia</th>
                            <th>Concelho</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Altitude</th>
                            <th>Era</th>
                        </tr>
                        <tr class="w3-white">
                            <td><xsl:value-of select="LUGAR"/></td>
                            <td><xsl:value-of select="FREGUE"/></td>
                            <td><xsl:value-of select="CONCEL"/></td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="LATITU">
                                        <xsl:value-of select="LATITU"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        -
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="LONGIT!=''">
                                        <xsl:value-of select="LONGIT"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        -
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="ALTITU!=''">
                                        <xsl:value-of select="ALTITU"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        -
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="CRONO!=''">
                                        <xsl:value-of select="CRONO"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        -
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                    </table>
                    
                    <xsl:apply-templates/>
                    
                    <h2>Bibliografia:</h2>
                    <ul>
                        <xsl:for-each select="BIBLIO">
                            <li><xsl:value-of select="."/></li>
                        </xsl:for-each>
                    </ul>
                    <xsl:choose>
                        <xsl:when test="AUTOR!=''">
                            <p>
                                <b>Autor: </b><xsl:value-of select="AUTOR"/>
                            </p>      
                        </xsl:when>
                    </xsl:choose>                      
                    <p>
                        <b>Data: </b><xsl:value-of select="DATA"/>
                    </p>
                </div>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="CODADM|IDENTI|DESCRI|TIPO|LUGAR|FREGUE|CONCEL|
        LATITU|LONGIT|ALTITU|BIBLIO|AUTOR|DATA|CRONO">
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <h2>Deposito:</h2>
        <p><xsl:value-of select="."/></p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="INTERP">
        <h2>Interpretação:</h2>
        <p><xsl:apply-templates/></p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <h2>Interesse:</h2>
        <p><xsl:apply-templates/></p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <h2>Desenho do arquivo:</h2>
        <p><xsl:apply-templates/></p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <h2>Trabalhos do arquivo:</h2>
        <p><xsl:apply-templates/></p>
        <hr/>
    </xsl:template>
    
    
    <xsl:template match="ACESSO">
        <h2>Acesso:</h2>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <h2>Quadro:</h2>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
</xsl:stylesheet>