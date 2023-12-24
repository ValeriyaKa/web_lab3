import lombok.Getter;
import lombok.Setter;

import jakarta.inject.Named;
import jakarta.enterprise.context.SessionScoped;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Named("resultTable")
@Entity
@SessionScoped
@Getter
@Setter
@Table(name = "web3")
public class ResultTable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seqGen")
    @SequenceGenerator(name = "seqGen", sequenceName = "gen_seq", allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bean_check_id")
    private BeanCheck beanCheck;

    @Transient
    private static final long serialVersionUID = 4L;

    private String owner;
    private float x, y, r;
    private boolean coordsStatus;
    private Date bornDate;

    public ResultTable(String owner, float x, float y, float r) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.r = r;
        coordsStatus = checkCoordinates(x, y, r);
        bornDate = new Date();
    }

    public ResultTable() {}

    boolean checkCoordinates(float x, float y, float r) {
        if (x >= 0 && x <= r/2 && y <= 0 && y <= r) {
            return true; // Определяет, попадает ли точка в условия области
        }
        // Круг
        if (x >= 0 && y >= 0 && Math.sqrt(x * x + y * y) <= r) {
            return true; // Определяет, попадает ли точка в условия области
        }
        // Треугольник
        if (x <= 0 && y <= 0 && y >= x/2 - r/2) {
            return true; // Определяет, попадает ли точка в условия области
        } else {
            return false; // В случае, если точка не попадает в условия области
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultTable)) return false;
        ResultTable beanCheck = (ResultTable) o;
        return Float.compare(beanCheck.x, x) == 0 &&
                Float.compare(beanCheck.y, y) == 0 &&
                Float.compare(beanCheck.r, r) == 0 &&
                coordsStatus == beanCheck.coordsStatus &&
                Objects.equals(owner, beanCheck.owner) &&
                Objects.equals(bornDate, beanCheck.bornDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(owner, x, y, r, coordsStatus, bornDate);
    }

    @Override
    public String toString() {
        return "<tr><td>" + x + "</td>" +
                "<td>" + y + "</td>" +
                "<td>" + r + "</td>" +
                "<td style='color: " + ((coordsStatus) ? "green" : "red") + "'>" + coordsStatus + "</td>" +
                "<td>" + bornDate + "</td></tr>";
    }
}
