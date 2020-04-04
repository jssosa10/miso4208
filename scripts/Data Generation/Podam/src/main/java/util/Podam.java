package util;

import entities.Topic;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class Podam {
    public Topic generateDefaultCar(){
        PodamFactory factory = new PodamFactoryImpl();
        Topic topic = factory.manufacturePojo(Topic.class);
        return topic;
    }
    public Topic generateCustom(){
        CustomStringManufacturer customStringManufacturer = new CustomStringManufacturer();
        PodamFactory factory = new PodamFactoryImpl();
        factory.getStrategy().addOrReplaceTypeManufacturer(String.class, customStringManufacturer);
        Topic topic = factory.manufacturePojo(Topic.class);
        return topic;
    }

}
