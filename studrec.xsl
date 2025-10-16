<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
  <title>Student List</title>
  <style>
    table {
      border-collapse: collapse;
      width: 50%;
      margin: 20px;
    }
    th, td {
      border: 1px solid #333;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #eee;
    }
  </style>
</head>
<body>
  <h2>Student Information</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Course</th>
    </tr>
    <xsl:for-each select="students/student">
      <tr>
        <td><xsl:value-of select="name"/></td>
        <td><xsl:value-of select="age"/></td>
        <td><xsl:value-of select="course"/></td>
      </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>

</xsl:stylesheet>