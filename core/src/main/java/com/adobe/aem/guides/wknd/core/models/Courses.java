package com.adobe.aem.guides.wknd.core.models;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Courses {
    @ValueMapValue
    private String name;

    @ValueMapValue
    private String age;

    @ValueMapValue
    private String classes;

    @ValueMapValue
    private String image;


    @ChildResource(name = "field1")
    private List<CoursesDetails> courseList;

    public List<CoursesDetails> courseList() { return courseList; }

    public String getName() {
        return name;
    }

    public String grade;

    public String getClasses() {
        return classes;
    }

   public String getImage()
   {
       return image;
   }


}
