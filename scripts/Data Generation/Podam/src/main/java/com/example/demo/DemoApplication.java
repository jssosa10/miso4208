package com.example.demo;

import Service.CreateData;
import com.fasterxml.jackson.core.JsonProcessingException;
import entities.Topic;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import util.Podam;

import java.util.Scanner;

@SpringBootApplication
public class DemoApplication {
    private static final Logger LOG = LoggerFactory.getLogger(DemoApplication.class);

    public static void main(String[] args) throws JsonProcessingException {
        SpringApplication.run(DemoApplication.class, args);

        Podam podam= new Podam();
        CreateData createData=new CreateData(podam);
        System.out.println("#################################--Podam-#####################################");
        System.out.println("1) generate data by default");
        System.out.println("2) generate data by custom");
        Scanner in = new Scanner(System.in);
        int type = in.nextInt();
        if(type==1){
            System.out.println("Cuantos objetos desea generar?");
            int times = in.nextInt();
            for(int i=0;i<times;i++){
                Topic topic =createData.generateDefaultCar();
                createData.printCar(topic);
            }
        }else{
            System.out.println("Cuantos objetos desea generar?");
            int times = in.nextInt();
            for(int i=0;i<times;i++){
                Topic topic =createData.generateCustomCar();
                createData.printCar(topic);
            }
        }

    }

}
