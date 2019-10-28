<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title><xsl:value-of select="pr/title"/></title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="html/w3.css"/>                
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="pr">
        <div class="w3-container w3-light-grey w3-text-dark-grey">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="metadata">
        <div class="w3-center w3-text-black">
            <h1><xsl:value-of select="title"/></h1>
            <h3><xsl:value-of select="subtitle"/></h3>
            <h2><xsl:value-of select="keyname"/></h2>
        </div>
        <table class="w3-table">
            <tr>
                <td class="w3-left-align">
                    <b>Supervisor: </b><a class="w3-text-indigo" href="https://{supervisor/@homepage}"><xsl:value-of select="supervisor"/></a>
                </td>
                <td class="w3-right-align">
                    <b>Initial date: </b> <xsl:value-of select="bdate"/><br/>
                    <b>Final date: </b> <xsl:value-of select="edate"/>
                </td>
            </tr>
        </table>
    </xsl:template>
    
    <xsl:template match="workteam">
        <h2 class="w3-text-black"><b>Workteam:</b></h2>
        <table class="w3-table w3-striped w3-bordered">
            <tr>
                <th> Identifier</th>
                <th> Name </th>
                <th> Email </th>
            </tr>
            <xsl:apply-templates/>
        </table>
        <hr/>
    </xsl:template>
    
    <xsl:template match="worker">
        <tr>
            <td><xsl:value-of select="identifier"/></td>
            <td><a class="w3-text-indigo" href="{git}"><xsl:value-of select="name"/></a></td>
            <td><xsl:value-of select="email"/></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="abstract">
        <h2 class="w3-text-black"><b>Abstract:</b></h2>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="u">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    
    <xsl:template match="xref">
        <a class="w3-text-indigo" href="{@url}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <h2 class="w3-text-black"><b>Deliverables:</b></h2>
        <ol>
            <xsl:apply-templates/>
        </ol>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li class="w3-text-indigo">
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
</xsl:stylesheet>