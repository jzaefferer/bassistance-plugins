import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;


public class Exporter {

	public static void main(String[] args) throws TransformerException {
		String path = "../jQueryDev/api-docs/";
		TransformerFactory factory = TransformerFactory.newInstance();
		Transformer transformer = factory.newTransformer( new StreamSource(path + "style/cat.xsl"));
		transformer.transform(new StreamSource(path + "cat.xml"), new StreamResult(path + "index.html"));
		transformer.transform(new StreamSource(path + "plugins.xml"), new StreamResult(path + "plugins.html"));
	}
	
}
