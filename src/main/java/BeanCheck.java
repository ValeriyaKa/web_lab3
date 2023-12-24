import lombok.Getter;
import lombok.Setter;

import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import jakarta.enterprise.context.SessionScoped;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Named("beanCheck")
@SessionScoped
@Getter
@Setter
@Entity
public class BeanCheck implements Serializable {

    private static final long serialVersionUID = 1L;
    private float x, y, R;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    private static EntityManagerFactory managerFactory;
    @Transient
    private EntityManager manager;

    @OneToMany(mappedBy = "beanCheck", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ResultTable> resultTable;

    public BeanCheck() {
        if (managerFactory == null) {
            managerFactory = Persistence.createEntityManagerFactory("dbCon");
        }
    }

    public void validate() {
        FacesContext facesContext = FacesContext.getCurrentInstance();

        try {
            manager = managerFactory.createEntityManager();
            EntityTransaction transaction = manager.getTransaction();

            transaction.begin();

            // Создание объекта ResultTable и сохранение его в базе данных
            ResultTable point = new ResultTable(
                    facesContext.getExternalContext().getSessionId(true),
                    getX(), getY(), getR()
            );
            point.setBeanCheck(this);
            manager.persist(point);

            transaction.commit();
            System.out.println("Данные успешно добавлены в базу данных!");
        } catch (Exception e) {
            System.out.println("Не удалось выполнить операцию в базе данных: " + e.getMessage());
            // Логирование ошибки или дополнительная обработка
        }
    }

    // Метод для закрытия EntityManager после завершения работы приложения
    public void closeEntityManager() {
        if (manager != null && manager.isOpen()) {
            manager.close();
        }
        if (managerFactory != null && managerFactory.isOpen()) {
            managerFactory.close();
        }
    }




    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BeanCheck)) return false;
        BeanCheck beanCheck = (BeanCheck) o;
        return Objects.equals(id, beanCheck.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "BeanCheck{" +
                "id=" + id +
                '}';
    }
}
