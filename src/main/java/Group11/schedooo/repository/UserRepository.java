package Group11.schedooo.repository;

import Group11.schedooo.model.User;

import java.util.List;


public interface UserRepository {

    public int save(User user);

    public User findByUsername(String username);

    public String login(User user);

    public boolean isUsernameAlreadyUsed(String username);

    public List<User> findAll();

    public void finda();

    public String getSHA256Hash(String input);
}
