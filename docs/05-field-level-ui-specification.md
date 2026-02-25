# 05. Field-Level UI Specification

## 05.1 Field Inventory Overview

| Field Label | Internal Name | Resource | Operation | Type | Required | Evidence |
|-------------|--------------|----------|-----------|------|----------|----------|
| Resource | `resource` | Global | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L72-L84` |
| Operation | `operation` | h2i | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L87-L98` |
| Operation | `operation` | image | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| Operation | `operation` | pdf | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| Operation | `operation` | tools | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L152-L163` |
| HTML | `html` | h2i | image, pdf | string | yes | `nodes/DavixH2I/DavixH2I.node.ts:L168-L178` |
| CSS | `css` | h2i | image, pdf | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L179-L188` |
| Width | `width` | h2i | image, pdf | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L189-L196` |
| Height | `height` | h2i | image, pdf | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L197-L204` |
| Format | `format` | h2i | image | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L205-L216` |
| PDF Format | `pdfFormat` | h2i | pdf | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L217-L228` |
| PDF Landscape | `pdfLandscape` | h2i | pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L229-L236` |
| Prefer CSS Page Size | `preferCSSPageSize` | h2i | pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L237-L244` |
| Scale | `scale` | h2i | pdf | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L245-L252` |
| Print Mode | `printMode` | h2i | pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L253-L260` |
| Print Background | `printBackground` | h2i | pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L261-L268` |
| Download Result as Binary | `downloadBinary` | h2i | image, pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L269-L276` |
| Output Binary Property | `outputBinaryProperty` | h2i | image, pdf | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L277-L285` |
| Input Binary Properties | `imageBinaryProps` | image | Global | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L290-L299` |
| Format | `imageFormat` | image | Global | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L300-L316` |
| Width | `imageWidth` | image | resize, format | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L317-L317` |
| Height | `imageHeight` | image | resize, format | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L318-L318` |
| Enlarge | `enlarge` | image | resize | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L319-L319` |
| Normalize Orientation | `normalizeOrientation` | image | resize, crop, enhance, metadata | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L320-L320` |
| Crop X | `cropX` | image | crop | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L321-L321` |
| Crop Y | `cropY` | image | crop | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L322-L322` |
| Crop Width | `cropWidth` | image | crop | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L323-L323` |
| Crop Height | `cropHeight` | image | crop | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L324-L324` |
| Background Color | `backgroundColor` | image | crop, compress, background | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L325-L325` |
| Rotate (degrees) | `rotate` | image | transform | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L326-L326` |
| Flip Horizontal | `flipH` | image | transform | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L327-L327` |
| Flip Vertical | `flipV` | image | transform | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L328-L328` |
| Color Space | `colorSpace` | image | transform, compress | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L329-L329` |
| Target Size (KB) | `targetSizeKB` | image | compress | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L330-L330` |
| Quality | `quality` | image | compress | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L331-L331` |
| Keep Metadata | `keepMetadata` | image | format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L332-L344` |
| Blur | `blur` | image | enhance | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L345-L345` |
| Sharpen | `sharpen` | image | enhance | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L346-L346` |
| Grayscale | `grayscale` | image | enhance | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L347-L347` |
| Sepia | `sepia` | image | enhance | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L348-L348` |
| Brightness | `brightness` | image | enhance | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L349-L349` |
| Contrast | `contrast` | image | enhance | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L350-L350` |
| Saturation | `saturation` | image | enhance | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L351-L351` |
| Pad | `pad` | image | padding, frame | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L352-L352` |
| Pad Top | `padTop` | image | padding | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L353-L353` |
| Pad Right | `padRight` | image | padding | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L354-L354` |
| Pad Bottom | `padBottom` | image | padding | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L355-L355` |
| Pad Left | `padLeft` | image | padding | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L356-L356` |
| Pad Color | `padColor` | image | padding, frame, background | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L357-L357` |
| Border | `border` | image | frame | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L358-L358` |
| Border Color | `borderColor` | image | frame | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L359-L359` |
| Border Radius | `borderRadius` | image | padding, background | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L360-L360` |
| Background Blur | `backgroundBlur` | image | background | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L361-L361` |
| Watermark Text | `watermarkText` | image | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L362-L362` |
| Watermark Font Size | `watermarkFontSize` | image | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L363-L363` |
| Watermark Color | `watermarkColor` | image | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L364-L364` |
| Watermark Opacity | `watermarkOpacity` | image | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L365-L365` |
| Watermark Position | `watermarkPosition` | image | watermark | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L366-L384` |
| Watermark Margin | `watermarkMargin` | image | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L385-L385` |
| Watermark Scale | `watermarkScale` | image | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L386-L386` |
| Watermark Image Binary Property | `watermarkImageBinaryProp` | image | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L387-L395` |
| PDF Mode | `pdfMode` | image | pdf | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L396-L407` |
| PDF Page Size | `pdfPageSize` | image | pdf | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L408-L420` |
| PDF Orientation | `pdfOrientation` | image | pdf | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L421-L432` |
| PDF Margin | `pdfMargin` | image, h2i | pdf | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L433-L440` |
| PDF Embed Format | `pdfEmbedFormat` | image | pdf | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L441-L452` |
| PDF JPEG Quality | `pdfJpegQuality` | image | pdf | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L453-L460` |
| Include Raw EXIF | `includeRawExif` | image | metadata | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L461-L461` |
| Actions | `actions` | image | multitask | multiOptions | no | `nodes/DavixH2I/DavixH2I.node.ts:L462-L480` |
| Format | `format` | image | multitask | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L481-L503` |
| Keep Metadata | `keepMetadata` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L504-L517` |
| Width | `width` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L518-L525` |
| Height | `height` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L526-L533` |
| Enlarge | `enlarge` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L534-L541` |
| Normalize Orientation | `normalizeOrientation` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L542-L549` |
| Crop X | `cropX` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L550-L557` |
| Crop Y | `cropY` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L558-L565` |
| Crop Width | `cropWidth` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L566-L573` |
| Crop Height | `cropHeight` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L574-L581` |
| Background Color | `backgroundColor` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L582-L589` |
| Rotate (degrees) | `rotate` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L590-L597` |
| Flip Horizontal | `flipH` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L598-L605` |
| Flip Vertical | `flipV` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L606-L613` |
| Color Space | `colorSpace` | image | multitask | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L614-L626` |
| Target Size (KB) | `targetSizeKB` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L627-L634` |
| Quality | `quality` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L635-L642` |
| Blur | `blur` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L643-L650` |
| Sharpen | `sharpen` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L651-L658` |
| Grayscale | `grayscale` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L659-L666` |
| Sepia | `sepia` | image | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L667-L674` |
| Brightness | `brightness` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L675-L682` |
| Contrast | `contrast` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L683-L690` |
| Saturation | `saturation` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L691-L698` |
| Pad | `pad` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L699-L706` |
| Pad Color | `padColor` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L707-L714` |
| Border | `border` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L715-L722` |
| Border Color | `borderColor` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L723-L730` |
| Border Radius | `borderRadius` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L731-L738` |
| Background Blur | `backgroundBlur` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L739-L746` |
| Watermark Text | `watermarkText` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L747-L754` |
| Watermark Font Size | `watermarkFontSize` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L755-L762` |
| Watermark Color | `watermarkColor` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L763-L770` |
| Watermark Opacity | `watermarkOpacity` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L771-L778` |
| Watermark Position | `watermarkPosition` | image | multitask | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L779-L797` |
| Watermark Margin | `watermarkMargin` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L798-L805` |
| Watermark Scale | `watermarkScale` | image | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L806-L813` |
| Watermark Image Binary Property | `watermarkImageBinaryProp` | image | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L814-L822` |
| Download Result(s) as Binary | `imageDownloadBinary` | image | format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf, multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L824-L836` |
| Output Binary Property | `imageOutputBinaryProperty` | image | format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf, multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L837-L851` |
| Input Binary Properties | `pdfBinaryProps` | pdf | Global | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L856-L865` |
| Sort By Name | `sortByName` | pdf | merge | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L866-L873` |
| Ranges | `ranges` | pdf | split | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L874-L882` |
| Prefix | `prefix` | pdf | split, extract | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L883-L890` |
| Mode | `mode` | pdf | extract | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L891-L902` |
| Pages | `pages` | pdf | to-images, extract-images, watermark, rotate, delete-pages, extract | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L903-L913` |
| To Format | `toFormat` | pdf | to-images | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L914-L926` |
| Width | `pdfWidth` | pdf | to-images | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L927-L927` |
| Height | `pdfHeight` | pdf | to-images | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L928-L928` |
| DPI | `dpi` | pdf | to-images | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L929-L929` |
| Extract Image Format | `extractImageFormat` | pdf | extract-images | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L931-L943` |
| Watermark Text | `watermarkText` | pdf | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L944-L944` |
| Watermark Opacity | `watermarkOpacity` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L945-L945` |
| Watermark Position | `watermarkPosition` | pdf | watermark | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L946-L960` |
| Watermark Margin | `watermarkMargin` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L961-L961` |
| Watermark X | `watermarkX` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L962-L969` |
| Watermark Y | `watermarkY` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L970-L977` |
| Watermark Font Size | `watermarkFontSize` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L978-L978` |
| Watermark Color | `watermarkColor` | pdf | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L979-L979` |
| Watermark Scale | `watermarkScale` | pdf | watermark | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L980-L980` |
| Watermark Image Binary Property | `watermarkImageBinaryProp` | pdf | watermark | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L981-L989` |
| Degrees | `degrees` | pdf | rotate | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L990-L990` |
| Title | `title` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L991-L991` |
| Author | `author` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L992-L992` |
| Subject | `subject` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L993-L993` |
| Keywords | `keywords` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L994-L994` |
| Creator | `creator` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L995-L995` |
| Producer | `producer` | pdf | metadata | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L996-L996` |
| Clean All Metadata | `cleanAllMetadata` | pdf | metadata | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L997-L997` |
| Order (CSV or JSON Array) | `order` | pdf | reorder | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L998-L998` |
| Flatten Forms | `flattenForms` | pdf | flatten | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L999-L999` |
| User Password | `userPassword` | pdf | encrypt | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1000-L1000` |
| Owner Password | `ownerPassword` | pdf | encrypt | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1001-L1001` |
| Password | `password` | pdf | decrypt | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1002-L1002` |
| Download Result(s) as Binary | `pdfDownloadBinary` | pdf | Global | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L1004-L1011` |
| Output Binary Property | `pdfOutputBinaryProperty` | pdf | Global | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1012-L1020` |
| Input Binary Properties | `toolsBinaryProps` | tools | Global | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1025-L1033` |
| Tool | `tool` | tools | single | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L1034-L1054` |
| Tools | `tools` | tools | multitask | multiOptions | no | `nodes/DavixH2I/DavixH2I.node.ts:L1055-L1075` |
| Include Raw EXIF | `metadataIncludeRawExifSingle` | tools | single | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L1076-L1083` |
| Palette Size | `paletteSizeSingle` | tools | single | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1084-L1091` |
| Hash Type | `hashTypeSingle` | tools | single | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L1092-L1105` |
| Similarity Mode | `similarityModeSingle` | tools | single | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1106-L1113` |
| Similarity Threshold | `similarityThresholdSingle` | tools | single | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1114-L1121` |
| Quality Sample | `qualitySampleSingle` | tools | single | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1122-L1129` |
| Transparency Sample | `transparencySampleSingle` | tools | single | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1130-L1137` |
| Efficiency Format | `efficiencyFormatSingle` | tools | single | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1138-L1145` |
| Efficiency Quality | `efficiencyQualitySingle` | tools | single | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1146-L1153` |
| Include Raw EXIF | `metadataIncludeRawExifMulti` | tools | multitask | boolean | no | `nodes/DavixH2I/DavixH2I.node.ts:L1154-L1161` |
| Palette Size | `paletteSizeMulti` | tools | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1162-L1169` |
| Hash Type | `hashTypeMulti` | tools | multitask | options | no | `nodes/DavixH2I/DavixH2I.node.ts:L1170-L1183` |
| Similarity Mode | `similarityModeMulti` | tools | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1184-L1191` |
| Similarity Threshold | `similarityThresholdMulti` | tools | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1192-L1199` |
| Quality Sample | `qualitySampleMulti` | tools | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1200-L1207` |
| Transparency Sample | `transparencySampleMulti` | tools | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1208-L1215` |
| Efficiency Format | `efficiencyFormatMulti` | tools | multitask | string | no | `nodes/DavixH2I/DavixH2I.node.ts:L1216-L1223` |
| Efficiency Quality | `efficiencyQualityMulti` | tools | multitask | number | no | `nodes/DavixH2I/DavixH2I.node.ts:L1224-L1231` |

## 05.2 Detailed Field Specifications

---

### Field: Resource

- **Internal name:** `resource`
- **Location:** Resource `Global` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'h2i'`
- **Display conditions:** `Global`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `H2I (HTML → Image)` => `'h2i'`
  - `Image (Transform / Export PDF)` => `'image'`
  - `PDF (Merge/Split/Compress/Convert)` => `'pdf'`
  - `Tools (Analyze Images)` => `'tools'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Controls node branch selection only; not sent as API parameter
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L72-L84`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Operation

- **Internal name:** `operation`
- **Location:** Resource `h2i` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'image'`
- **Display conditions:** `{ show: { resource: ['h2i'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Render HTML to Image` => `'image'`
  - `Render HTML to PDF` => `'pdf'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to request `action` for selected resource
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L87-L98`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Operation

- **Internal name:** `operation`
- **Location:** Resource `image` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'format'`
- **Display conditions:** `{ show: { resource: ['image'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Format` => `'format'`
  - `Resize` => `'resize'`
  - `Crop` => `'crop'`
  - `Transform` => `'transform'`
  - `Compress` => `'compress'`
  - `Enhance` => `'enhance'`
  - `Padding` => `'padding'`
  - `Frame` => `'frame'`
  - `Background` => `'background'`
  - `Watermark` => `'watermark'`
  - `PDF Export` => `'pdf'`
  - `Metadata (JSON only)` => `'metadata'`
  - `Multitask` => `'multitask'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to request `action` for selected resource
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L101-L123`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Operation

- **Internal name:** `operation`
- **Location:** Resource `pdf` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'merge'`
- **Display conditions:** `{ show: { resource: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `To Images` => `'to-images'`
  - `Merge` => `'merge'`
  - `Split` => `'split'`
  - `Compress` => `'compress'`
  - `Extract Images` => `'extract-images'`
  - `Watermark` => `'watermark'`
  - `Rotate` => `'rotate'`
  - `Metadata` => `'metadata'`
  - `Reorder` => `'reorder'`
  - `Delete Pages` => `'delete-pages'`
  - `Extract Pages` => `'extract'`
  - `Flatten` => `'flatten'`
  - `Encrypt` => `'encrypt'`
  - `Decrypt` => `'decrypt'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to request `action` for selected resource
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L126-L149`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Operation

- **Internal name:** `operation`
- **Location:** Resource `tools` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'single'`
- **Display conditions:** `{ show: { resource: ['tools'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Single Tool` => `'single'`
  - `Multitask` => `'multitask'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to request `action` for selected resource
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L152-L163`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: HTML

- **Internal name:** `html`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `string`
- **Required:** `yes`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `html`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L168-L178`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: CSS

- **Internal name:** `css`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `css`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L179-L188`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Width

- **Internal name:** `width`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1000`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `width`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L189-L196`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Height

- **Internal name:** `height`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1500`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `height`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L197-L204`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Format

- **Internal name:** `format`
- **Location:** Resource `h2i` → Operation `image` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'png'`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `PNG` => `'png'`
  - `JPEG` => `'jpeg'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `format`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L205-L216`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Format

- **Internal name:** `pdfFormat`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'a4'`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `A4` => `'a4'`
  - `Letter` => `'letter'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfFormat`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L217-L228`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Landscape

- **Internal name:** `pdfLandscape`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfLandscape`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L229-L236`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Prefer CSS Page Size

- **Internal name:** `preferCSSPageSize`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `true`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `preferCSSPageSize`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L237-L244`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Scale

- **Internal name:** `scale`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `scale`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L245-L252`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Print Mode

- **Internal name:** `printMode`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `printMode`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L253-L260`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Print Background

- **Internal name:** `printBackground`
- **Location:** Resource `h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `true`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `printBackground`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L261-L268`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Download Result as Binary

- **Internal name:** `downloadBinary`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Controls post-response file download, not API request
- **Transformation behavior:** Used after API response to decide whether URL output is downloaded into binary data.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L269-L276`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Output Binary Property

- **Internal name:** `outputBinaryProperty`
- **Location:** Resource `h2i` → Operation `image, pdf` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['h2i'], operation: ['image', 'pdf'], downloadBinary: [true] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used as output binary key name
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L277-L285`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Input Binary Properties

- **Internal name:** `imageBinaryProps`
- **Location:** Resource `image` → Operation `Global` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['image'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used to read binary inputs and attach multipart `images` files
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L290-L299`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Format

- **Internal name:** `imageFormat`
- **Location:** Resource `image` → Operation `Global` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'webp'`
- **Display conditions:** `{ show: { resource: ['image'] }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `JPEG` => `'jpeg'`
  - `PNG` => `'png'`
  - `WebP` => `'webp'`
  - `AVIF` => `'avif'`
  - `GIF` => `'gif'`
  - `SVG` => `'svg'`
  - `PDF` => `'pdf'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `imageFormat`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L300-L316`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Width

- **Internal name:** `imageWidth`
- **Location:** Resource `image` → Operation `resize, format` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['resize', 'format'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `imageWidth`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L317-L317`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Height

- **Internal name:** `imageHeight`
- **Location:** Resource `image` → Operation `resize, format` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['resize', 'format'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `imageHeight`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L318-L318`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Enlarge

- **Internal name:** `enlarge`
- **Location:** Resource `image` → Operation `resize` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['resize'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `enlarge`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L319-L319`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Normalize Orientation

- **Internal name:** `normalizeOrientation`
- **Location:** Resource `image` → Operation `resize, crop, enhance, metadata` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['resize', 'crop', 'enhance', 'metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `normalizeOrientation`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L320-L320`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop X

- **Internal name:** `cropX`
- **Location:** Resource `image` → Operation `crop` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['crop'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropX`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L321-L321`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Y

- **Internal name:** `cropY`
- **Location:** Resource `image` → Operation `crop` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['crop'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropY`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L322-L322`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Width

- **Internal name:** `cropWidth`
- **Location:** Resource `image` → Operation `crop` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['crop'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropWidth`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L323-L323`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Height

- **Internal name:** `cropHeight`
- **Location:** Resource `image` → Operation `crop` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['crop'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropHeight`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L324-L324`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Background Color

- **Internal name:** `backgroundColor`
- **Location:** Resource `image` → Operation `crop, compress, background` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['crop', 'compress', 'background'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `backgroundColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L325-L325`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Rotate (degrees)

- **Internal name:** `rotate`
- **Location:** Resource `image` → Operation `transform` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['transform'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `rotate`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L326-L326`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Flip Horizontal

- **Internal name:** `flipH`
- **Location:** Resource `image` → Operation `transform` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['transform'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `flipH`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L327-L327`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Flip Vertical

- **Internal name:** `flipV`
- **Location:** Resource `image` → Operation `transform` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['transform'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `flipV`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L328-L328`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Color Space

- **Internal name:** `colorSpace`
- **Location:** Resource `image` → Operation `transform, compress` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'srgb'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['transform', 'compress'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `sRGB` => `'srgb'`
  - `Grayscale` => `'grayscale'`
  - `CMYK` => `'cmyk'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `colorSpace`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L329-L329`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Target Size (KB)

- **Internal name:** `targetSizeKB`
- **Location:** Resource `image` → Operation `compress` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['compress'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `targetSizeKB`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L330-L330`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Quality

- **Internal name:** `quality`
- **Location:** Resource `image` → Operation `compress` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `82`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['compress'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `quality`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L331-L331`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Keep Metadata

- **Internal name:** `keepMetadata`
- **Location:** Resource `image` → Operation `format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf'], }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `keepMetadata`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L332-L344`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Blur

- **Internal name:** `blur`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `blur`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L345-L345`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Sharpen

- **Internal name:** `sharpen`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `sharpen`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L346-L346`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Grayscale

- **Internal name:** `grayscale`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `grayscale`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L347-L347`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Sepia

- **Internal name:** `sepia`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `sepia`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L348-L348`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Brightness

- **Internal name:** `brightness`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `brightness`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L349-L349`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Contrast

- **Internal name:** `contrast`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `contrast`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L350-L350`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Saturation

- **Internal name:** `saturation`
- **Location:** Resource `image` → Operation `enhance` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['enhance'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `saturation`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L351-L351`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad

- **Internal name:** `pad`
- **Location:** Resource `image` → Operation `padding, frame` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding', 'frame'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pad`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L352-L352`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Top

- **Internal name:** `padTop`
- **Location:** Resource `image` → Operation `padding` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padTop`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L353-L353`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Right

- **Internal name:** `padRight`
- **Location:** Resource `image` → Operation `padding` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padRight`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L354-L354`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Bottom

- **Internal name:** `padBottom`
- **Location:** Resource `image` → Operation `padding` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padBottom`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L355-L355`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Left

- **Internal name:** `padLeft`
- **Location:** Resource `image` → Operation `padding` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padLeft`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L356-L356`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Color

- **Internal name:** `padColor`
- **Location:** Resource `image` → Operation `padding, frame, background` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding', 'frame', 'background'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L357-L357`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border

- **Internal name:** `border`
- **Location:** Resource `image` → Operation `frame` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['frame'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `border`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L358-L358`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border Color

- **Internal name:** `borderColor`
- **Location:** Resource `image` → Operation `frame` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['frame'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `borderColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L359-L359`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border Radius

- **Internal name:** `borderRadius`
- **Location:** Resource `image` → Operation `padding, background` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['padding', 'background'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `borderRadius`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L360-L360`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Background Blur

- **Internal name:** `backgroundBlur`
- **Location:** Resource `image` → Operation `background` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['background'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `backgroundBlur`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L361-L361`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Text

- **Internal name:** `watermarkText`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkText`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L362-L362`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Font Size

- **Internal name:** `watermarkFontSize`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `24`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkFontSize`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L363-L363`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Color

- **Internal name:** `watermarkColor`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'#000000'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L364-L364`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Opacity

- **Internal name:** `watermarkOpacity`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0.35`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkOpacity`; PDF watermark uses `opacity`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L365-L365`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Position

- **Internal name:** `watermarkPosition`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'center'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Center` => `'center'`
  - `Top` => `'top'`
  - `Bottom` => `'bottom'`
  - `Left` => `'left'`
  - `Right` => `'right'`
  - `Top Left` => `'top-left'`
  - `Top Right` => `'top-right'`
  - `Bottom Left` => `'bottom-left'`
  - `Bottom Right` => `'bottom-right'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkPosition`; PDF watermark uses `position`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L366-L384`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Margin

- **Internal name:** `watermarkMargin`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `8`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkMargin`; PDF watermark uses `margin`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L385-L385`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Scale

- **Internal name:** `watermarkScale`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkScale`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L386-L386`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Image Binary Property

- **Internal name:** `watermarkImageBinaryProp`
- **Location:** Resource `image` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Attached as multipart file field `watermarkImage`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L387-L395`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Mode

- **Internal name:** `pdfMode`
- **Location:** Resource `image` → Operation `pdf` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'single'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Single` => `'single'`
  - `Multi` => `'multi'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfMode`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L396-L407`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Page Size

- **Internal name:** `pdfPageSize`
- **Location:** Resource `image` → Operation `pdf` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'auto'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Auto` => `'auto'`
  - `A4` => `'a4'`
  - `Letter` => `'letter'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfPageSize`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L408-L420`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Orientation

- **Internal name:** `pdfOrientation`
- **Location:** Resource `image` → Operation `pdf` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'portrait'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Portrait` => `'portrait'`
  - `Landscape` => `'landscape'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfOrientation`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L421-L432`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Margin

- **Internal name:** `pdfMargin`
- **Location:** Resource `image, h2i` → Operation `pdf` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `24`
- **Display conditions:** `{ show: { resource: ['image', 'h2i'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfMargin`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L433-L440`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF Embed Format

- **Internal name:** `pdfEmbedFormat`
- **Location:** Resource `image` → Operation `pdf` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'png'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `PNG` => `'png'`
  - `JPEG` => `'jpeg'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfEmbedFormat`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L441-L452`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: PDF JPEG Quality

- **Internal name:** `pdfJpegQuality`
- **Location:** Resource `image` → Operation `pdf` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `85`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfJpegQuality`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L453-L460`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Include Raw EXIF

- **Internal name:** `includeRawExif`
- **Location:** Resource `image` → Operation `metadata` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `includeRawExif`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L461-L461`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Actions

- **Internal name:** `actions`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `multiOptions`
- **Required:** `no`
- **Default value:** `[]`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Format` => `'format'`
  - `Resize` => `'resize'`
  - `Crop` => `'crop'`
  - `Transform` => `'transform'`
  - `Compress` => `'compress'`
  - `Enhance` => `'enhance'`
  - `Frame` => `'frame'`
  - `Background` => `'background'`
  - `Watermark` => `'watermark'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `actions`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Empty selected action list in image multitask throws runtime error.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L462-L480`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Format

- **Internal name:** `format`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'webp'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'], }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `JPEG` => `'jpeg'`
  - `PNG` => `'png'`
  - `WebP` => `'webp'`
  - `AVIF` => `'avif'`
  - `GIF` => `'gif'`
  - `SVG` => `'svg'`
  - `PDF` => `'pdf'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `format`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L481-L503`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Keep Metadata

- **Internal name:** `keepMetadata`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'], }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `keepMetadata`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L504-L517`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Width

- **Internal name:** `width`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `width`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L518-L525`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Height

- **Internal name:** `height`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `height`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L526-L533`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Enlarge

- **Internal name:** `enlarge`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['resize'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `enlarge`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L534-L541`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Normalize Orientation

- **Internal name:** `normalizeOrientation`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['resize', 'crop', 'enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `normalizeOrientation`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L542-L549`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop X

- **Internal name:** `cropX`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropX`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L550-L557`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Y

- **Internal name:** `cropY`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropY`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L558-L565`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Width

- **Internal name:** `cropWidth`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropWidth`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L566-L573`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Crop Height

- **Internal name:** `cropHeight`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cropHeight`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L574-L581`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Background Color

- **Internal name:** `backgroundColor`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop', 'compress', 'background'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `backgroundColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L582-L589`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Rotate (degrees)

- **Internal name:** `rotate`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `rotate`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L590-L597`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Flip Horizontal

- **Internal name:** `flipH`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `flipH`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L598-L605`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Flip Vertical

- **Internal name:** `flipV`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `flipV`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L606-L613`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Color Space

- **Internal name:** `colorSpace`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'srgb'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform', 'compress'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `sRGB` => `'srgb'`
  - `Grayscale` => `'grayscale'`
  - `CMYK` => `'cmyk'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `colorSpace`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L614-L626`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Target Size (KB)

- **Internal name:** `targetSizeKB`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `targetSizeKB`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L627-L634`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Quality

- **Internal name:** `quality`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `82`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `quality`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L635-L642`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Blur

- **Internal name:** `blur`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `blur`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L643-L650`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Sharpen

- **Internal name:** `sharpen`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `sharpen`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L651-L658`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Grayscale

- **Internal name:** `grayscale`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `grayscale`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L659-L666`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Sepia

- **Internal name:** `sepia`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `sepia`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L667-L674`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Brightness

- **Internal name:** `brightness`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `brightness`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L675-L682`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Contrast

- **Internal name:** `contrast`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `contrast`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L683-L690`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Saturation

- **Internal name:** `saturation`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `saturation`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L691-L698`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad

- **Internal name:** `pad`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pad`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L699-L706`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pad Color

- **Internal name:** `padColor`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `padColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L707-L714`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border

- **Internal name:** `border`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `border`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L715-L722`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border Color

- **Internal name:** `borderColor`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `borderColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L723-L730`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Border Radius

- **Internal name:** `borderRadius`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `borderRadius`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L731-L738`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Background Blur

- **Internal name:** `backgroundBlur`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['background'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `backgroundBlur`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L739-L746`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Text

- **Internal name:** `watermarkText`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkText`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L747-L754`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Font Size

- **Internal name:** `watermarkFontSize`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `24`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkFontSize`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L755-L762`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Color

- **Internal name:** `watermarkColor`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'#000000'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L763-L770`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Opacity

- **Internal name:** `watermarkOpacity`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0.35`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkOpacity`; PDF watermark uses `opacity`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L771-L778`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Position

- **Internal name:** `watermarkPosition`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'center'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Center` => `'center'`
  - `Top` => `'top'`
  - `Bottom` => `'bottom'`
  - `Left` => `'left'`
  - `Right` => `'right'`
  - `Top Left` => `'top-left'`
  - `Top Right` => `'top-right'`
  - `Bottom Left` => `'bottom-left'`
  - `Bottom Right` => `'bottom-right'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkPosition`; PDF watermark uses `position`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L779-L797`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Margin

- **Internal name:** `watermarkMargin`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `8`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkMargin`; PDF watermark uses `margin`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L798-L805`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Scale

- **Internal name:** `watermarkScale`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkScale`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L806-L813`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Image Binary Property

- **Internal name:** `watermarkImageBinaryProp`
- **Location:** Resource `image` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Attached as multipart file field `watermarkImage`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L814-L822`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Download Result(s) as Binary

- **Internal name:** `imageDownloadBinary`
- **Location:** Resource `image` → Operation `format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf, multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'], }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Controls post-response file download except forced false for image metadata action
- **Transformation behavior:** Used after API response to decide whether URL output is downloaded into binary data.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L824-L836`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Output Binary Property

- **Internal name:** `imageOutputBinaryProperty`
- **Location:** Resource `image` → Operation `format, resize, crop, transform, compress, enhance, padding, frame, background, watermark, pdf, multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'], imageDownloadBinary: [true], }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used as output binary key name
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L837-L851`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Input Binary Properties

- **Internal name:** `pdfBinaryProps`
- **Location:** Resource `pdf` → Operation `Global` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used to read binary inputs and attach multipart `files` files
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L856-L865`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Sort By Name

- **Internal name:** `sortByName`
- **Location:** Resource `pdf` → Operation `merge` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['merge'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `sortByName`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L866-L873`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Ranges

- **Internal name:** `ranges`
- **Location:** Resource `pdf` → Operation `split` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['split'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `ranges`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L874-L882`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Prefix

- **Internal name:** `prefix`
- **Location:** Resource `pdf` → Operation `split, extract` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'split_'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['split', 'extract'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `prefix`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L883-L890`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Mode

- **Internal name:** `mode`
- **Location:** Resource `pdf` → Operation `extract` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'single'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['extract'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Single` => `'single'`
  - `Multiple` => `'multiple'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `mode`; `range` is transformed to `single` before send
- **Transformation behavior:** Mapped to `mode`; `range` is transformed to `single` before send
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L891-L902`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Pages

- **Internal name:** `pages`
- **Location:** Resource `pdf` → Operation `to-images, extract-images, watermark, rotate, delete-pages, extract` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'all'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['to-images', 'extract-images', 'watermark', 'rotate', 'delete-pages', 'extract'] }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pages`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L903-L913`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: To Format

- **Internal name:** `toFormat`
- **Location:** Resource `pdf` → Operation `to-images` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'png'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['to-images'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `PNG` => `'png'`
  - `JPEG` => `'jpeg'`
  - `WebP` => `'webp'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `toFormat`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L914-L926`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Width

- **Internal name:** `pdfWidth`
- **Location:** Resource `pdf` → Operation `to-images` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['to-images'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfWidth`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L927-L927`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Height

- **Internal name:** `pdfHeight`
- **Location:** Resource `pdf` → Operation `to-images` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['to-images'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `pdfHeight`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L928-L928`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: DPI

- **Internal name:** `dpi`
- **Location:** Resource `pdf` → Operation `to-images` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `150`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['to-images'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `dpi`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L929-L929`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Extract Image Format

- **Internal name:** `extractImageFormat`
- **Location:** Resource `pdf` → Operation `extract-images` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'png'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['extract-images'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `PNG` => `'png'`
  - `JPEG` => `'jpeg'`
  - `WebP` => `'webp'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `imageFormat` in PDF extract-images request
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L931-L943`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Text

- **Internal name:** `watermarkText`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkText`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L944-L944`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Opacity

- **Internal name:** `watermarkOpacity`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0.35`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkOpacity`; PDF watermark uses `opacity`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L945-L945`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Position

- **Internal name:** `watermarkPosition`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'center'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Center` => `'center'`
  - `Top Left` => `'top-left'`
  - `Top Right` => `'top-right'`
  - `Bottom Left` => `'bottom-left'`
  - `Bottom Right` => `'bottom-right'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkPosition`; PDF watermark uses `position`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L946-L960`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Margin

- **Internal name:** `watermarkMargin`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `8`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Image watermark uses `watermarkMargin`; PDF watermark uses `margin`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L961-L961`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark X

- **Internal name:** `watermarkX`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `x` (PDF watermark action)
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L962-L969`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Y

- **Internal name:** `watermarkY`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `y` (PDF watermark action)
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L970-L977`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Font Size

- **Internal name:** `watermarkFontSize`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `24`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkFontSize`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L978-L978`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Color

- **Internal name:** `watermarkColor`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'#000000'`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkColor`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L979-L979`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Scale

- **Internal name:** `watermarkScale`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `1`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `watermarkScale`
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L980-L980`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Watermark Image Binary Property

- **Internal name:** `watermarkImageBinaryProp`
- **Location:** Resource `pdf` → Operation `watermark` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['watermark'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Attached as multipart file field `watermarkImage`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L981-L989`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Degrees

- **Internal name:** `degrees`
- **Location:** Resource `pdf` → Operation `rotate` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `90`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['rotate'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `90` => `90`
  - `180` => `180`
  - `270` => `270`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `degrees`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L990-L990`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Title

- **Internal name:** `title`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `title`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L991-L991`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Author

- **Internal name:** `author`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `author`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L992-L992`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Subject

- **Internal name:** `subject`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `subject`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L993-L993`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Keywords

- **Internal name:** `keywords`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `keywords`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L994-L994`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Creator

- **Internal name:** `creator`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `creator`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L995-L995`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Producer

- **Internal name:** `producer`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `producer`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L996-L996`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Clean All Metadata

- **Internal name:** `cleanAllMetadata`
- **Location:** Resource `pdf` → Operation `metadata` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['metadata'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `cleanAllMetadata`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L997-L997`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Order (CSV or JSON Array)

- **Internal name:** `order`
- **Location:** Resource `pdf` → Operation `reorder` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['reorder'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `order`; JSON array input is parsed then joined as CSV before send
- **Transformation behavior:** Mapped to `order`; JSON array input is parsed then joined as CSV before send
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Invalid JSON array or non-positive integers throw `NodeOperationError`.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L998-L998`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Flatten Forms

- **Internal name:** `flattenForms`
- **Location:** Resource `pdf` → Operation `flatten` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `true`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['flatten'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `flattenForms`
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L999-L999`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: User Password

- **Internal name:** `userPassword`
- **Location:** Resource `pdf` → Operation `encrypt` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['encrypt'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `userPassword`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1000-L1000`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Owner Password

- **Internal name:** `ownerPassword`
- **Location:** Resource `pdf` → Operation `encrypt` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['encrypt'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `ownerPassword`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1001-L1001`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Password

- **Internal name:** `password`
- **Location:** Resource `pdf` → Operation `decrypt` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['pdf'], operation: ['decrypt'] } } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** `password`
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1002-L1002`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Download Result(s) as Binary

- **Internal name:** `pdfDownloadBinary`
- **Location:** Resource `pdf` → Operation `Global` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['pdf'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Controls post-response file download, not API request
- **Transformation behavior:** Used after API response to decide whether URL output is downloaded into binary data.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1004-L1011`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Output Binary Property

- **Internal name:** `pdfOutputBinaryProperty`
- **Location:** Resource `pdf` → Operation `Global` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['pdf'], pdfDownloadBinary: [true] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used as output binary key name
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1012-L1020`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Input Binary Properties

- **Internal name:** `toolsBinaryProps`
- **Location:** Resource `tools` → Operation `Global` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'data'`
- **Display conditions:** `{ show: { resource: ['tools'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Used to read binary inputs and attach multipart `images` files
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1025-L1033`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Tool

- **Internal name:** `tool`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'metadata'`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Metadata` => `'metadata'`
  - `Colors` => `'colors'`
  - `Detect Format` => `'detect-format'`
  - `Orientation` => `'orientation'`
  - `Hash` => `'hash'`
  - `Similarity` => `'similarity'`
  - `Dimensions` => `'dimensions'`
  - `Palette` => `'palette'`
  - `Transparency` => `'transparency'`
  - `Quality` => `'quality'`
  - `Efficiency` => `'efficiency'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to formData `tools` (single value)
- **Transformation behavior:** `tools` field is single value for single mode or comma-joined string for multitask mode.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Empty single tool selection throws runtime error.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1034-L1054`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Tools

- **Internal name:** `tools`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `multiOptions`
- **Required:** `no`
- **Default value:** `['metadata']`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `Metadata` => `'metadata'`
  - `Colors` => `'colors'`
  - `Detect Format` => `'detect-format'`
  - `Orientation` => `'orientation'`
  - `Hash` => `'hash'`
  - `Similarity` => `'similarity'`
  - `Dimensions` => `'dimensions'`
  - `Palette` => `'palette'`
  - `Transparency` => `'transparency'`
  - `Quality` => `'quality'`
  - `Efficiency` => `'efficiency'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to formData `tools` as comma-separated list
- **Transformation behavior:** `tools` field is single value for single mode or comma-joined string for multitask mode.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Empty multitask tool list throws `NodeOperationError`.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1055-L1075`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Include Raw EXIF

- **Internal name:** `metadataIncludeRawExifSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['metadata'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `includeRawExif` when tools selection includes metadata
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1076-L1083`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Palette Size

- **Internal name:** `paletteSizeSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `5`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['palette'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `paletteSize` when palette tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1084-L1091`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Hash Type

- **Internal name:** `hashTypeSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'phash'`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['hash'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `pHash` => `'phash'`
  - `MD5` => `'md5'`
  - `SHA1` => `'sha1'`
  - `SHA256` => `'sha256'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `hashType` when hash tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1092-L1105`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Similarity Mode

- **Internal name:** `similarityModeSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'pairs'`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `similarityMode` when similarity tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1106-L1113`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Similarity Threshold

- **Internal name:** `similarityThresholdSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `8`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `similarityThreshold` when similarity tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1114-L1121`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Quality Sample

- **Internal name:** `qualitySampleSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `256`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['quality'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `qualitySample` when quality tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1122-L1129`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Transparency Sample

- **Internal name:** `transparencySampleSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `64`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['transparency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `transparencySample` when transparency tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1130-L1137`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Efficiency Format

- **Internal name:** `efficiencyFormatSingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `efficiencyFormat` when efficiency tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1138-L1145`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Efficiency Quality

- **Internal name:** `efficiencyQualitySingle`
- **Location:** Resource `tools` → Operation `single` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `efficiencyQuality` when efficiency tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1146-L1153`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Include Raw EXIF

- **Internal name:** `metadataIncludeRawExifMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `boolean`
- **Required:** `no`
- **Default value:** `false`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['metadata'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `includeRawExif` when tools selection includes metadata
- **Transformation behavior:** When sent via multipart formData helpers, boolean is stringified through `toBoolString`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1154-L1161`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Palette Size

- **Internal name:** `paletteSizeMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `5`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['palette'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `paletteSize` when palette tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1162-L1169`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Hash Type

- **Internal name:** `hashTypeMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `options`
- **Required:** `no`
- **Default value:** `'phash'`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['hash'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - `pHash` => `'phash'`
  - `MD5` => `'md5'`
  - `SHA1` => `'sha1'`
  - `SHA256` => `'sha256'`
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `hashType` when hash tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1170-L1183`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Similarity Mode

- **Internal name:** `similarityModeMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `'pairs'`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `similarityMode` when similarity tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1184-L1191`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Similarity Threshold

- **Internal name:** `similarityThresholdMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `8`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `similarityThreshold` when similarity tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1192-L1199`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Quality Sample

- **Internal name:** `qualitySampleMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `256`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['quality'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `qualitySample` when quality tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1200-L1207`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Transparency Sample

- **Internal name:** `transparencySampleMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `64`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['transparency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `transparencySample` when transparency tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1208-L1215`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Efficiency Format

- **Internal name:** `efficiencyFormatMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `string`
- **Required:** `no`
- **Default value:** `''`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `efficiencyFormat` when efficiency tool selected
- **Transformation behavior:** No transformation confirmed in code.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1216-L1223`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

---

### Field: Efficiency Quality

- **Internal name:** `efficiencyQualityMulti`
- **Location:** Resource `tools` → Operation `multitask` (or Global if applicable)
- **Type:** `number`
- **Required:** `no`
- **Default value:** `0`
- **Display conditions:** `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } }`
- **Validation rules:** `Not confirmed in code.`
- **Options (if dropdown):**
  - Not confirmed in code.
- **Collection structure (if collection/fixedCollection):**
  - Not confirmed in code (field is not collection/fixedCollection).
- **Dynamic loading (if loadOptions present):**
  - Not confirmed in code (no loadOptions on this field).
- **Maps to request parameter:** Mapped to `efficiencyQuality` when efficiency tool selected
- **Transformation behavior:** When sent via `setNumber`, value is converted to string and omitted when `0`.
- **Interaction rules:**
  - Visibility and behavior controlled by `displayOptions` and selected resource/operation values.
  - Mutually exclusive behavior: Not confirmed in code unless implied by different `operation` values.
- **Error behavior (if confirmed):**
  - Not confirmed in code.
- **Evidence:** `nodes/DavixH2I/DavixH2I.node.ts:L1224-L1231`; `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`

## 05.3 Conditional Logic Matrix

| Field | Visible When | Hidden When | Evidence |
|-------|--------------|-------------|----------|
| `resource` | `Global (always visible)` | Not hidden by displayOptions. | `nodes/DavixH2I/DavixH2I.node.ts:L72-L84` |
| `operation` | `{ show: { resource: ['h2i'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L87-L98` |
| `operation` | `{ show: { resource: ['image'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L101-L123` |
| `operation` | `{ show: { resource: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L126-L149` |
| `operation` | `{ show: { resource: ['tools'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L152-L163` |
| `html` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L168-L178` |
| `css` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L179-L188` |
| `width` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L189-L196` |
| `height` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L197-L204` |
| `format` | `{ show: { resource: ['h2i'], operation: ['image'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L205-L216` |
| `pdfFormat` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L217-L228` |
| `pdfLandscape` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L229-L236` |
| `preferCSSPageSize` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L237-L244` |
| `scale` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L245-L252` |
| `printMode` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L253-L260` |
| `printBackground` | `{ show: { resource: ['h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L261-L268` |
| `downloadBinary` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L269-L276` |
| `outputBinaryProperty` | `{ show: { resource: ['h2i'], operation: ['image', 'pdf'], downloadBinary: [true] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L277-L285` |
| `imageBinaryProps` | `{ show: { resource: ['image'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L290-L299` |
| `imageFormat` | `{ show: { resource: ['image'] }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L300-L316` |
| `imageWidth` | `{ show: { resource: ['image'], operation: ['resize', 'format'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L317-L317` |
| `imageHeight` | `{ show: { resource: ['image'], operation: ['resize', 'format'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L318-L318` |
| `enlarge` | `{ show: { resource: ['image'], operation: ['resize'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L319-L319` |
| `normalizeOrientation` | `{ show: { resource: ['image'], operation: ['resize', 'crop', 'enhance', 'metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L320-L320` |
| `cropX` | `{ show: { resource: ['image'], operation: ['crop'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L321-L321` |
| `cropY` | `{ show: { resource: ['image'], operation: ['crop'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L322-L322` |
| `cropWidth` | `{ show: { resource: ['image'], operation: ['crop'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L323-L323` |
| `cropHeight` | `{ show: { resource: ['image'], operation: ['crop'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L324-L324` |
| `backgroundColor` | `{ show: { resource: ['image'], operation: ['crop', 'compress', 'background'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L325-L325` |
| `rotate` | `{ show: { resource: ['image'], operation: ['transform'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L326-L326` |
| `flipH` | `{ show: { resource: ['image'], operation: ['transform'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L327-L327` |
| `flipV` | `{ show: { resource: ['image'], operation: ['transform'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L328-L328` |
| `colorSpace` | `{ show: { resource: ['image'], operation: ['transform', 'compress'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L329-L329` |
| `targetSizeKB` | `{ show: { resource: ['image'], operation: ['compress'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L330-L330` |
| `quality` | `{ show: { resource: ['image'], operation: ['compress'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L331-L331` |
| `keepMetadata` | `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf'], }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L332-L344` |
| `blur` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L345-L345` |
| `sharpen` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L346-L346` |
| `grayscale` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L347-L347` |
| `sepia` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L348-L348` |
| `brightness` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L349-L349` |
| `contrast` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L350-L350` |
| `saturation` | `{ show: { resource: ['image'], operation: ['enhance'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L351-L351` |
| `pad` | `{ show: { resource: ['image'], operation: ['padding', 'frame'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L352-L352` |
| `padTop` | `{ show: { resource: ['image'], operation: ['padding'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L353-L353` |
| `padRight` | `{ show: { resource: ['image'], operation: ['padding'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L354-L354` |
| `padBottom` | `{ show: { resource: ['image'], operation: ['padding'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L355-L355` |
| `padLeft` | `{ show: { resource: ['image'], operation: ['padding'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L356-L356` |
| `padColor` | `{ show: { resource: ['image'], operation: ['padding', 'frame', 'background'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L357-L357` |
| `border` | `{ show: { resource: ['image'], operation: ['frame'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L358-L358` |
| `borderColor` | `{ show: { resource: ['image'], operation: ['frame'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L359-L359` |
| `borderRadius` | `{ show: { resource: ['image'], operation: ['padding', 'background'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L360-L360` |
| `backgroundBlur` | `{ show: { resource: ['image'], operation: ['background'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L361-L361` |
| `watermarkText` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L362-L362` |
| `watermarkFontSize` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L363-L363` |
| `watermarkColor` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L364-L364` |
| `watermarkOpacity` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L365-L365` |
| `watermarkPosition` | `{ show: { resource: ['image'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L366-L384` |
| `watermarkMargin` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L385-L385` |
| `watermarkScale` | `{ show: { resource: ['image'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L386-L386` |
| `watermarkImageBinaryProp` | `{ show: { resource: ['image'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L387-L395` |
| `pdfMode` | `{ show: { resource: ['image'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L396-L407` |
| `pdfPageSize` | `{ show: { resource: ['image'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L408-L420` |
| `pdfOrientation` | `{ show: { resource: ['image'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L421-L432` |
| `pdfMargin` | `{ show: { resource: ['image', 'h2i'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L433-L440` |
| `pdfEmbedFormat` | `{ show: { resource: ['image'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L441-L452` |
| `pdfJpegQuality` | `{ show: { resource: ['image'], operation: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L453-L460` |
| `includeRawExif` | `{ show: { resource: ['image'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L461-L461` |
| `actions` | `{ show: { resource: ['image'], operation: ['multitask'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L462-L480` |
| `format` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'], }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L481-L503` |
| `keepMetadata` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'frame', 'background', 'watermark'], }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L504-L517` |
| `width` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L518-L525` |
| `height` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['format', 'resize'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L526-L533` |
| `enlarge` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['resize'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L534-L541` |
| `normalizeOrientation` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['resize', 'crop', 'enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L542-L549` |
| `cropX` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L550-L557` |
| `cropY` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L558-L565` |
| `cropWidth` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L566-L573` |
| `cropHeight` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L574-L581` |
| `backgroundColor` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['crop', 'compress', 'background'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L582-L589` |
| `rotate` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L590-L597` |
| `flipH` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L598-L605` |
| `flipV` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L606-L613` |
| `colorSpace` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['transform', 'compress'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L614-L626` |
| `targetSizeKB` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L627-L634` |
| `quality` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['compress'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L635-L642` |
| `blur` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L643-L650` |
| `sharpen` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L651-L658` |
| `grayscale` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L659-L666` |
| `sepia` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L667-L674` |
| `brightness` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L675-L682` |
| `contrast` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L683-L690` |
| `saturation` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['enhance'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L691-L698` |
| `pad` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L699-L706` |
| `padColor` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L707-L714` |
| `border` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L715-L722` |
| `borderColor` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L723-L730` |
| `borderRadius` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['frame', 'background'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L731-L738` |
| `backgroundBlur` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['background'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L739-L746` |
| `watermarkText` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L747-L754` |
| `watermarkFontSize` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L755-L762` |
| `watermarkColor` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L763-L770` |
| `watermarkOpacity` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L771-L778` |
| `watermarkPosition` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L779-L797` |
| `watermarkMargin` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L798-L805` |
| `watermarkScale` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L806-L813` |
| `watermarkImageBinaryProp` | `{ show: { resource: ['image'], operation: ['multitask'], actions: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L814-L822` |
| `imageDownloadBinary` | `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'], }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L824-L836` |
| `imageOutputBinaryProperty` | `{ show: { resource: ['image'], operation: ['format', 'resize', 'crop', 'transform', 'compress', 'enhance', 'padding', 'frame', 'background', 'watermark', 'pdf', 'multitask'], imageDownloadBinary: [true], }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L837-L851` |
| `pdfBinaryProps` | `{ show: { resource: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L856-L865` |
| `sortByName` | `{ show: { resource: ['pdf'], operation: ['merge'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L866-L873` |
| `ranges` | `{ show: { resource: ['pdf'], operation: ['split'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L874-L882` |
| `prefix` | `{ show: { resource: ['pdf'], operation: ['split', 'extract'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L883-L890` |
| `mode` | `{ show: { resource: ['pdf'], operation: ['extract'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L891-L902` |
| `pages` | `{ show: { resource: ['pdf'], operation: ['to-images', 'extract-images', 'watermark', 'rotate', 'delete-pages', 'extract'] }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L903-L913` |
| `toFormat` | `{ show: { resource: ['pdf'], operation: ['to-images'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L914-L926` |
| `pdfWidth` | `{ show: { resource: ['pdf'], operation: ['to-images'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L927-L927` |
| `pdfHeight` | `{ show: { resource: ['pdf'], operation: ['to-images'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L928-L928` |
| `dpi` | `{ show: { resource: ['pdf'], operation: ['to-images'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L929-L929` |
| `extractImageFormat` | `{ show: { resource: ['pdf'], operation: ['extract-images'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L931-L943` |
| `watermarkText` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L944-L944` |
| `watermarkOpacity` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L945-L945` |
| `watermarkPosition` | `{ show: { resource: ['pdf'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L946-L960` |
| `watermarkMargin` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L961-L961` |
| `watermarkX` | `{ show: { resource: ['pdf'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L962-L969` |
| `watermarkY` | `{ show: { resource: ['pdf'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L970-L977` |
| `watermarkFontSize` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L978-L978` |
| `watermarkColor` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L979-L979` |
| `watermarkScale` | `{ show: { resource: ['pdf'], operation: ['watermark'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L980-L980` |
| `watermarkImageBinaryProp` | `{ show: { resource: ['pdf'], operation: ['watermark'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L981-L989` |
| `degrees` | `{ show: { resource: ['pdf'], operation: ['rotate'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L990-L990` |
| `title` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L991-L991` |
| `author` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L992-L992` |
| `subject` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L993-L993` |
| `keywords` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L994-L994` |
| `creator` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L995-L995` |
| `producer` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L996-L996` |
| `cleanAllMetadata` | `{ show: { resource: ['pdf'], operation: ['metadata'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L997-L997` |
| `order` | `{ show: { resource: ['pdf'], operation: ['reorder'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L998-L998` |
| `flattenForms` | `{ show: { resource: ['pdf'], operation: ['flatten'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L999-L999` |
| `userPassword` | `{ show: { resource: ['pdf'], operation: ['encrypt'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1000-L1000` |
| `ownerPassword` | `{ show: { resource: ['pdf'], operation: ['encrypt'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1001-L1001` |
| `password` | `{ show: { resource: ['pdf'], operation: ['decrypt'] } } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1002-L1002` |
| `pdfDownloadBinary` | `{ show: { resource: ['pdf'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1004-L1011` |
| `pdfOutputBinaryProperty` | `{ show: { resource: ['pdf'], pdfDownloadBinary: [true] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1012-L1020` |
| `toolsBinaryProps` | `{ show: { resource: ['tools'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1025-L1033` |
| `tool` | `{ show: { resource: ['tools'], operation: ['single'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1034-L1054` |
| `tools` | `{ show: { resource: ['tools'], operation: ['multitask'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1055-L1075` |
| `metadataIncludeRawExifSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['metadata'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1076-L1083` |
| `paletteSizeSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['palette'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1084-L1091` |
| `hashTypeSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['hash'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1092-L1105` |
| `similarityModeSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1106-L1113` |
| `similarityThresholdSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['similarity'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1114-L1121` |
| `qualitySampleSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['quality'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1122-L1129` |
| `transparencySampleSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['transparency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1130-L1137` |
| `efficiencyFormatSingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1138-L1145` |
| `efficiencyQualitySingle` | `{ show: { resource: ['tools'], operation: ['single'], tool: ['efficiency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1146-L1153` |
| `metadataIncludeRawExifMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['metadata'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1154-L1161` |
| `paletteSizeMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['palette'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1162-L1169` |
| `hashTypeMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['hash'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1170-L1183` |
| `similarityModeMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1184-L1191` |
| `similarityThresholdMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['similarity'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1192-L1199` |
| `qualitySampleMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['quality'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1200-L1207` |
| `transparencySampleMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['transparency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1208-L1215` |
| `efficiencyFormatMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1216-L1223` |
| `efficiencyQualityMulti` | `{ show: { resource: ['tools'], operation: ['multitask'], tools: ['efficiency'] } }` | When displayOptions `show` conditions are not met. | `nodes/DavixH2I/DavixH2I.node.ts:L1224-L1231` |

## 05.4 Field Dependency Graph (Text-Based)

- `resource` -> resource-specific `operation` selector -> operation-scoped fields via `displayOptions`.
- H2I path: `resource=h2i` -> `operation=image|pdf` -> render fields + optional binary download fields.
- Image path: `resource=image` -> `operation` action -> operation fields; `operation=multitask` additionally requires `actions` then shows per-action support fields.
- PDF path: `resource=pdf` -> `operation` action -> action-specific fields + optional binary download fields.
- Tools path: `resource=tools` -> `operation=single|multitask` -> `tool`/`tools` -> tool-specific tuning fields.

## Open Questions / Missing Evidence

- Backend/API-side validation rules beyond UI `minValue`/`maxValue` are not confirmed in repository code.
- No `loadOptions` dynamic option loaders are defined in `description.properties`; dynamic fetching behavior is not confirmed in code.
- Formal hidden field defaults in n8n runtime when fields are not shown are not explicitly documented in code.

## Evidence Index

- `nodes/DavixH2I/DavixH2I.node.ts:L72-L1231`: complete `description.properties` field definitions, defaults, option lists, displayOptions, and validation hints.
- `nodes/DavixH2I/DavixH2I.node.ts:L1242-L1908`: request mapping, transformations, conditional handling, binary output handling, and field-level error behavior in execute flow.