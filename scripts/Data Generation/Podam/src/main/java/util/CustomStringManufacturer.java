package util;

import entities.Topic;
import uk.co.jemos.podam.api.AttributeMetadata;
import uk.co.jemos.podam.api.DataProviderStrategy;
import uk.co.jemos.podam.typeManufacturers.StringTypeManufacturerImpl;

import java.lang.reflect.Type;
import java.util.Map;

public class CustomStringManufacturer extends StringTypeManufacturerImpl {
    @Override
    public String getType(DataProviderStrategy strategy,
                          AttributeMetadata attributeMetadata,
                          Map<String, Type> genericTypesArgumentsMap) {

        if (Topic.class.isAssignableFrom(attributeMetadata.getPojoClass())) {

            if ("topic".equals(attributeMetadata.getAttributeName())) {
                return "demo";
            } else if ("nick".equals(attributeMetadata.getAttributeName())) {
                return "ramiro";
            }else if ("time".equals(attributeMetadata.getAttributeName())) {
                return "20200403";
            }
        }
        return super.getType(strategy, attributeMetadata, genericTypesArgumentsMap);
    };

}
